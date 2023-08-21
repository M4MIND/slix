import { AllocatorHelper } from '../../index';
import { TYPED_ARRAY } from '../types/DataType';
import Allocator from './Allocator';
import { add } from 'benny';
import { LoggerManager } from 'logger';

enum MEMORY_BLOCK_HEADER {
    BLOCK_SIZE = 0,
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
    free = 0,
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
        let address = 0;
        let count = 0;

        while (address < this.byteSize) {
            const sizeOf = `%c${[
                `[${this.sizeOf(address)}]`,
                `[${this.sizeOf(address)}]`,
                `[${this.sizeOf(address)}]`,
                `[${this.sizeOf(address)}]`,
            ].join('')}`;

            const used = this.dataView.getUint8(address + 4);

            const endSizeOf = this.sizeOf(address + this.sizeOf(address) - 4);
            const alignEnd = this.dataView.getUint8(address + this.sizeOf(address) - 5);
            const alignStart = this.dataView.getUint8(address + alignEnd - 1);

            console.debug(
                [
                    `[$${count}]`,
                    sizeOf,
                    `%c[${used}]`,
                    `%c[${alignStart}]`,
                    `%c${[...new Array(this.sizeOf(address) - alignEnd - 5)]
                        .map((v) => `[${this.dataView.getUint8(address + v)}]`)
                        .join('')}`,
                    `%c[${alignEnd}]`,
                    `%c[${endSizeOf}]`,
                ].join(''),
                'color: white; float: left; background-color: blue; padding: 2px 4px; border-radius: 2px',
                `color: white; float: left; background-color: ${
                    used === USED_FLAGS.free ? 'green' : 'red'
                }; padding: 2px 4px; border-radius: 2px`,
                'color: black; float: left; background-color: yellow; padding: 2px 4px; border-radius: 2px',
                'color: black; float: left; background-color: white; padding: 2px 4px; border-radius: 2px',
                'color: black; float: left; background-color: yellow; padding: 2px 4px; border-radius: 2px',
                'color: white; float: left; background-color: blue; padding: 2px 4px; border-radius: 2px'
            );

            count++;
            address += this.sizeOf(address);
        }
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

    deallocate(byteOffset: number): void {
        const ptrDataView = byteOffset - this.dataView.byteOffset;
        const ptrStartBlock = ptrDataView - this.dataView.getUint8(ptrDataView - 1);
        const sizeOf = this.dataView.getUint32(ptrStartBlock);

        // Устанавлиаем флаг что блок свободен
        this.dataView.setUint8(ptrStartBlock + 4, USED_FLAGS.free);

        // Сбрасываем информацию о выравнивании
        this.dataView.setUint8(ptrDataView - 1, 0);
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
            if (sizeOf < size + 11) {
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

            // Обновляем открывающий заголовки
            // Размер используемого блока
            this.dataView.setUint32(address, needByteSize);
            // Флаг что блок используется
            this.setUse(address, USED_FLAGS.use);
            // Выравнивание блока
            this.dataView.setUint8(address + alignForwardAdjustmentWithHeader - 1, alignForwardAdjustmentWithHeader);

            // Закрывающий загловок
            const endBlock = address + needByteSize;

            this.dataView.setUint32(endBlock - 4, needByteSize);
            this.dataView.setUint8(endBlock - 5, alignForwardAdjustmentWithHeader);

            // Новый блок
            this.dataView.setUint32(endBlock, sizeOf - needByteSize);
            this.dataView.setUint8(endBlock + 4, USED_FLAGS.free);
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
