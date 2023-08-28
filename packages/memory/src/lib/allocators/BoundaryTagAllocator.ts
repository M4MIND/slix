import { ALLOCATOR, AllocatorHelper } from '../../index';
import AllocatorIsFull from '../exceptions/AllocatorIsFull';
import AllocatorInterface, { MemoryPointer } from './AllocatorInterface';

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

export default class BoundaryTagAllocator implements AllocatorInterface {
    public readonly typeAllocator = ALLOCATOR.TAG_BOUNDARY;
    public readonly arrayBuffer: ArrayBuffer;
    private readonly dataView: DataView;
    private _usedMemory = 0;
    private _numAllocations = 0;
    private _addressTemp = 0;
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

    constructor(memoryPointer: MemoryPointer) {
        this.arrayBuffer = memoryPointer.buffer;
        this.dataView = new DataView(memoryPointer.buffer, memoryPointer.byteOffset, memoryPointer.byteLength);
        this._byteSize = this.dataView.byteLength;
        this._byteOffset = this.dataView.byteOffset;

        this.clear();
    }

    private isFree(address: number) {
        return this.dataView.getUint8(address + MEMORY_BLOCK_HEADER.USED) === USED_FLAGS.free;
    }

    private sizeOf(address: number) {
        return this.dataView.getUint32(address);
    }

    deallocate(byteOffset: number): void {
        const ptrDataView = byteOffset - this._byteOffset;
        const ptrStartBlock = ptrDataView - this.dataView.getUint8(ptrDataView - 1);

        let sizeOfDeallocateBlock = this.dataView.getUint32(ptrStartBlock);

        // Устанавлиаем флаг что блок свободен
        this.dataView.setUint8(ptrStartBlock + 4, USED_FLAGS.free);

        this._usedMemory -= sizeOfDeallocateBlock;
        this._numAllocations--;

        if (ptrStartBlock + sizeOfDeallocateBlock <= this._byteSize) {
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

    malloc(size: number, alignment: number): MemoryPointer {
        AllocatorHelper.checkParamsMalloc(size, alignment);

        this._addressTemp = 0;

        while (this._addressTemp < this._byteSize) {
            // Если блок доступен
            if (!this.isFree(this._addressTemp)) {
                this._addressTemp += this.sizeOf(this._addressTemp);
                continue;
            }

            const sizeOfBlock = this.sizeOf(this._addressTemp);

            // Быстрая проверка
            if (sizeOfBlock <= size) {
                this._addressTemp += sizeOfBlock;
                continue;
            }

            // Считаем сколько всего потребуется памяти для записи
            // Выравнивание
            const alignForwardAdjustmentWithHeader = AllocatorHelper.alignForwardAdjustmentWithHeader(
                this._addressTemp,
                alignment,
                MEMORY_BLOCK_HEADER.HEADER_SIZE
            );

            // Количество байтов с выравниванием
            const needByteSize = alignForwardAdjustmentWithHeader + size + MEMORY_BLOCK_HEADER_END.HEADER_SIZE;

            if (sizeOfBlock - needByteSize - 9 < 0) {
                this._addressTemp += sizeOfBlock;
                continue;
            }
            // Обновляем заголовок начала блока
            this.dataView.setUint32(this._addressTemp, needByteSize); // Размер выделенного блока
            this.dataView.setUint8(this._addressTemp + 4, USED_FLAGS.use); // Флаг что блок используется
            this.dataView.setUint8(
                this._addressTemp + alignForwardAdjustmentWithHeader - 1,
                alignForwardAdjustmentWithHeader
            ); // Информация о выравнивании

            const endHeaderBlock = this._addressTemp + needByteSize;
            // Обновляем заголовок конца блока
            this.dataView.setUint32(endHeaderBlock - 4, needByteSize);
            this.dataView.setUint8(endHeaderBlock - 5, alignForwardAdjustmentWithHeader);

            const sizeOfFreeBlock = sizeOfBlock - needByteSize;

            // Создаем новый блок
            this.dataView.setUint32(endHeaderBlock, sizeOfFreeBlock);
            this.dataView.setUint8(endHeaderBlock + 4, USED_FLAGS.free);
            this.dataView.setUint32(this._addressTemp + sizeOfBlock - 4, sizeOfFreeBlock);

            this._numAllocations++;
            this._usedMemory += needByteSize;

            return {
                buffer: this.arrayBuffer,
                byteLength: size,
                byteOffset: this._byteOffset + this._addressTemp + alignForwardAdjustmentWithHeader,
            };
        }

        throw new AllocatorIsFull(this);
    }

    clear() {
        this.dataView.setUint32(0, this._byteSize);
        this.dataView.setUint8(4, USED_FLAGS.free);
        this.dataView.setUint32(this._byteSize - 4, this._byteSize);
    }
}
