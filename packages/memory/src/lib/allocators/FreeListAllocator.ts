import { AllocatorHelper } from '../../index';
import Allocator from './Allocator';

enum MEMORY_BLOCK_HEADER {
    USED = 4,
    HEADER_SIZE = 6,
}

enum MEMORY_BLOCK_HEADER_END {
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
    private readonly _byteSize;
    public get byteSize(): number {
        return this._byteSize;
    }

    public get usedMemory(): number {
        return this._usedMemory;
    }

    public get numAllocations(): number {
        return this._numAllocations;
    }

    constructor(dataView: DataView) {
        this.arrayBuffer = dataView.buffer;
        this.dataView = dataView;
        this._byteSize = this.dataView.byteLength;

        this.dataView.setUint32(0, this.byteSize);
        this.dataView.setUint8(4, USED_FLAGS.free);
        this.dataView.setUint32(this.byteSize - 4, this.byteSize);
    }

    private isFree(address: number) {
        return this.dataView.getUint8(address + MEMORY_BLOCK_HEADER.USED) === USED_FLAGS.free;
    }

    private sizeOf(address: number) {
        return this.dataView.getUint32(address);
    }

    deallocate(byteOffset: number): void {
        const ptrDataView = byteOffset - this.dataView.byteOffset;
        const ptrStartBlock = ptrDataView - this.dataView.getUint8(ptrDataView - 1);
        let sizeOfDeallocateBlock = this.dataView.getUint32(ptrStartBlock);
        // Устанавлиаем флаг что блок свободен
        this.dataView.setUint8(ptrStartBlock + 4, USED_FLAGS.free);

        this._usedMemory -= sizeOfDeallocateBlock;
        this._numAllocations--;

        if (ptrStartBlock + sizeOfDeallocateBlock < this.byteSize) {
            const nextAddress = ptrStartBlock + sizeOfDeallocateBlock;
            if (this.isFree(nextAddress)) {
                const sizeOfNextBlock = this.sizeOf(nextAddress);

                sizeOfDeallocateBlock += sizeOfNextBlock;

                this.dataView.setUint32(ptrStartBlock, sizeOfDeallocateBlock);
                this.dataView.setUint32(nextAddress + sizeOfNextBlock - 4, sizeOfDeallocateBlock);
            }
        }

        // Проверяем предыдущий блок
        if (ptrStartBlock !== 0) {
            const prevAddress = ptrStartBlock - this.dataView.getUint32(ptrStartBlock - 4);
            if (this.isFree(prevAddress)) {
                const sizeOfPrevBlock = this.sizeOf(prevAddress);
                sizeOfDeallocateBlock += sizeOfPrevBlock;
                this.dataView.setUint32(prevAddress, sizeOfDeallocateBlock);
                this.dataView.setUint32(prevAddress + sizeOfDeallocateBlock - 4, sizeOfDeallocateBlock);
            }
        }
    }

    malloc(size: number, alignment: number): DataView {
        if (size <= 0 || alignment <= 0) {
            throw new Error(`size or alignment can't be < 0`);
        }

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
            this.dataView.setUint8(address + 4, USED_FLAGS.use);
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

            this._usedMemory += needByteSize;
            this._numAllocations++;

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
