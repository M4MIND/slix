import { AllocatorHelper, TypeAllocator } from '../../index';
import Allocator from './Allocator';

enum MEMORY_BLOCK_HEADER {
    USED = 4,
    HEADER_SIZE = 6,
}

enum MEMORY_BLOCK_HEADER_END {
    HEADER_SIZE = 5,
}

enum USED_FLAGS {
    free = 100,
    use = 200,
}

export default class FreeListAllocator implements Allocator {
    public readonly typeAllocator = TypeAllocator.FREE_LIST;
    public readonly arrayBuffer: ArrayBuffer;
    private readonly dataView: DataView;
    private _usedMemory = 0;
    private _numAllocations = 0;
    private readonly _byteSize;
    private readonly _byteOffset;
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
        this._byteOffset = this.dataView.byteOffset;

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

    getMemory() {
        return new Uint8Array(this.arrayBuffer, this._byteOffset, this.byteSize);
    }

    deallocate(byteOffset: number): void {
        const ptrDataView = byteOffset - this._byteOffset;
        const ptrStartBlock = ptrDataView - this.dataView.getUint8(ptrDataView - 1);

        let sizeOfDeallocateBlock = this.dataView.getUint32(ptrStartBlock);

        // Устанавлиаем флаг что блок свободен
        this.dataView.setUint8(ptrStartBlock + 4, USED_FLAGS.free);

        this._usedMemory -= sizeOfDeallocateBlock;
        this._numAllocations--;

        if (ptrStartBlock + sizeOfDeallocateBlock <= this.byteSize) {
            const nextAddress = ptrStartBlock + sizeOfDeallocateBlock;

            if (this.isFree(nextAddress)) {
                const nextBlockSizeOf = this.sizeOf(nextAddress);
                sizeOfDeallocateBlock += nextBlockSizeOf;
                this.dataView.setUint32(ptrStartBlock, sizeOfDeallocateBlock);
                this.dataView.setUint32(nextAddress + nextBlockSizeOf - 4, sizeOfDeallocateBlock);
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
            // Если блок доступен
            if (!this.isFree(address)) {
                address += this.sizeOf(address);
                continue;
            }

            const sizeOfBlock = this.sizeOf(address);

            if (sizeOfBlock === 0) {
                throw new Error(`${address} === 0 bytes`);
            }

            // Быстрая проверка
            if (sizeOfBlock <= size) {
                address += sizeOfBlock;
                continue;
            }

            // Считаем сколько всего потребуется памяти для записи
            // Выравнивание
            const alignForwardAdjustmentWithHeader = AllocatorHelper.alignForwardAdjustmentWithHeader(
                address,
                alignment,
                MEMORY_BLOCK_HEADER.HEADER_SIZE
            );

            // Количество байтов с выравниванием
            const needByteSize = alignForwardAdjustmentWithHeader + size + MEMORY_BLOCK_HEADER_END.HEADER_SIZE;

            if (sizeOfBlock - needByteSize - 9 < 0) {
                address += sizeOfBlock;
                continue;
            }
            // Обновляем заголовок начала блока
            this.dataView.setUint32(address, needByteSize); // Размер выделенного блока
            this.dataView.setUint8(address + 4, USED_FLAGS.use); // Флаг что блок используется
            this.dataView.setUint8(address + alignForwardAdjustmentWithHeader - 1, alignForwardAdjustmentWithHeader); // Информация о выравнивании

            const endHeaderBlock = address + needByteSize;
            // Обновляем заголовок конца блока
            this.dataView.setUint32(endHeaderBlock - 4, needByteSize);
            this.dataView.setUint8(endHeaderBlock - 5, alignForwardAdjustmentWithHeader);

            // Создаем новый блок
            this.dataView.setUint32(endHeaderBlock, sizeOfBlock - needByteSize);
            this.dataView.setUint8(endHeaderBlock + 4, USED_FLAGS.free);
            this.dataView.setUint32(address + sizeOfBlock - 4, sizeOfBlock - needByteSize);

            this._numAllocations++;
            this._usedMemory += needByteSize;

            return new DataView(this.arrayBuffer, address + this._byteOffset + alignForwardAdjustmentWithHeader, size);
        }

        throw new Error(`Memory is not free. Used: ${this.usedMemory}, Free: ${this.byteSize - this.usedMemory}`);
    }
}
