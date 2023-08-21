import { AllocatorHelper } from '../../index';
import { TYPED_ARRAY } from '../types/DataType';
import Allocator from './Allocator';
import { add } from 'benny';
import { LoggerManager } from 'logger';

enum MEMORY_BLOCK_HEADER {
    SIZE = 0,
    USED = 4,
    ALIGN = 5,
    HEADER_SIZE = 6,
}

enum MEMORY_BLOCK_HEADER_END {
    SIZE = 0,
    ALIGN = 4,
    HEADER_SIZE = 5,
}

enum USED_FLAGS {
    free = 128,
    use = 255,
}

export default class FreeListAllocator implements Allocator {
    public readonly arrayBuffer: ArrayBuffer;
    public readonly dataView: DataView;
    private _usedMemory = 0;
    private _numAllocations = 0;
    public get byteSize(): number {
        return this.dataView.byteLength;
    }

    public get usedMemory(): number {
        return this._usedMemory;
    }

    private set usedMemory(v: number) {
        this._usedMemory = v;
    }

    public get numAllocations(): number {
        return this._numAllocations;
    }

    private set numAllocations(v: number) {
        this._numAllocations = v;
    }

    constructor(dataView: DataView) {
        this.arrayBuffer = dataView.buffer;
        this.dataView = dataView;

        this.dataView.setUint32(0, this.byteSize);
        this.dataView.setUint8(4, USED_FLAGS.free);
        this.dataView.setUint32(this.byteSize - 4, this.byteSize);
    }

    printMemory() {
        const list = [];
        for (let i = 0; i < this.byteSize; i++) {
            if (i % 4 === 0) {
                list.push('  ');
            }
            if (i % 16 === 0) {
                list.push('\n');
            }
            const data = this.dataView.getUint8(i).toString();
            list.push(`[${'0'.repeat(3 - data.length)}${data}]`);
        }

        LoggerManager.get('MemoryServer::ALLOCATORS').info(list.join(''));
    }

    private isFree(address: number) {
        return this.dataView.getUint8(address + MEMORY_BLOCK_HEADER.USED) === USED_FLAGS.free;
    }

    private setUse(address: number, flag: USED_FLAGS) {
        this.dataView.setUint8(address + MEMORY_BLOCK_HEADER.USED, flag);
    }

    private sizeOf(address: number) {
        return this.dataView.getUint32(address);
    }

    deallocate(dataView: TYPED_ARRAY | DataView): void {
        // Вычисляем смещение в аллокаторе
        const offsetInAllocator = dataView.byteOffset - this.dataView.byteOffset;

        // Вычисляем адрес блока
        const clearBlockAddress = offsetInAllocator - this.dataView.getUint8(offsetInAllocator - 1);

        // Ставим статус что блок не используется
        this.setUse(clearBlockAddress, USED_FLAGS.free);

        let sizeOfClearBlockAddress = this.sizeOf(clearBlockAddress);

        // Если это не последний блок
        // if (sizeOfClearBlockAddress + clearBlockAddress !== this.byteSize) {
        //     // Адрес следующего блока
        //     const nextAddress = sizeOfClearBlockAddress + clearBlockAddress;
        //
        //     // Если следующий адрес не используется то можно его смержить
        //     if (this.isFree(nextAddress)) {
        //         const sizeOfNextAddress = this.sizeOf(nextAddress);
        //         sizeOfClearBlockAddress += sizeOfNextAddress;
        //         // Обновляем размер удаляемого блока
        //         this.dataView.setUint32(clearBlockAddress, sizeOfClearBlockAddress);
        //         // Обновляем заголовок о размере блока в конце
        //         this.dataView.setUint32(clearBlockAddress + sizeOfClearBlockAddress - 4, sizeOfClearBlockAddress);
        //     }
        // }
        //
        // // Если это не начальный блок
        // if (clearBlockAddress !== 0) {
        //     // Адрес предыдущего блока
        //     const prevAddress = clearBlockAddress - this.dataView.getUint32(clearBlockAddress - 4);
        //
        //     if (this.isFree(prevAddress)) {
        //         const sizeOfPrevAddress = this.dataView.getUint32(prevAddress);
        //         sizeOfClearBlockAddress += sizeOfPrevAddress;
        //         this.dataView.setUint32(prevAddress, sizeOfClearBlockAddress);
        //         this.dataView.setUint32(clearBlockAddress + sizeOfClearBlockAddress - 4, sizeOfClearBlockAddress);
        //     }
        // }
    }

    malloc(size: number, alignment: number): DataView {
        let address = 0;

        while (address < this.byteSize) {
            // Проверка свободен ли блок
            if (!this.isFree(address)) {
                address = address + this.sizeOf(address);
                continue;
            }
            // Быстрая проверка хватит ли места для записи
            const sizeOf = this.sizeOf(address);
            if (sizeOf < size) {
                address = address + sizeOf;
                continue;
            }
            // Полная проверка блока
            const alignForwardAdjustmentWithHeader = AllocatorHelper.alignForwardAdjustmentWithHeader(
                address,
                alignment,
                MEMORY_BLOCK_HEADER.HEADER_SIZE
            );

            const needByteSize = size + alignForwardAdjustmentWithHeader + MEMORY_BLOCK_HEADER_END.HEADER_SIZE;

            if (sizeOf < needByteSize) {
                address = address + sizeOf;
                continue;
            }

            // Если места хватает, подготавливаем блок
            // Записываем информацию о размере блока
            this.dataView.setUint32(address, needByteSize);
            // Ставим флаг, что блок используется
            this.setUse(address, USED_FLAGS.use);
            // Записываем информацию о выравнивании блока в конец, чтобы можно было найти адрес блока для удаления
            this.dataView.setUint8(address + alignForwardAdjustmentWithHeader - 1, alignForwardAdjustmentWithHeader);

            // Записываем информацию о выделеном блоке в конец блока

            // Размер блока
            this.dataView.setUint32(address + needByteSize - 4, needByteSize);
            // Выравнивание
            this.dataView.setUint8(address + needByteSize - 5, alignForwardAdjustmentWithHeader);

            // Создаем новый свободный блок
            this.dataView.setUint32(address + needByteSize, sizeOf - needByteSize);
            this.dataView.setUint8(address + needByteSize + 4, USED_FLAGS.free);
            this.dataView.setUint32(address + sizeOf - 4, sizeOf - needByteSize);

            this.usedMemory += needByteSize;

            return new DataView(
                this.arrayBuffer,
                this.dataView.byteOffset + address + alignForwardAdjustmentWithHeader,
                size
            );
        }

        throw new Error(
            `Memory is not free. Used: ${this.usedMemory}, Free: ${this.byteSize - this.usedMemory}, Need: ${
                AllocatorHelper.alignForwardAdjustmentWithHeader(address, alignment, MEMORY_BLOCK_HEADER.HEADER_SIZE) +
                MEMORY_BLOCK_HEADER_END.HEADER_SIZE +
                size
            }`
        );
    }
}
