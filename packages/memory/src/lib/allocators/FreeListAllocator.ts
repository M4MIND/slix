import { ALLOCATOR, AllocatorHelper } from '../../index';
import AllocatorInterface from './AllocatorInterface';

enum ALLOCATION_HEADER {
    size = 0,
    nextPtr = 4,
    adjustment = 8,
    HEADER_SIZE = 9,
}
export default class FreeListAllocator implements AllocatorInterface {
    public readonly typeAllocator: ALLOCATOR = ALLOCATOR.FREE_LIST;
    private readonly _byteSize: number;
    private readonly _arrayBuffer: ArrayBuffer;
    private _numAllocations = 0;
    private _usedMemory = 0;
    private _offset = 0;
    private _freeBlocksPtr = 0;

    get byteSize(): number {
        return this._byteSize;
    }
    get numAllocations(): number {
        return this._numAllocations;
    }

    get usedMemory(): number {
        return this._usedMemory;
    }

    constructor(private readonly dataView: DataView) {
        this._byteSize = this.dataView.byteLength;
        this._offset = this.dataView.byteOffset;
        this._arrayBuffer = this.dataView.buffer;

        this.clear();
    }
    getSize(ptr: number) {
        return this.dataView.getUint32(ptr + ALLOCATION_HEADER.size);
    }

    setSize(ptr: number, size: number) {
        this.dataView.setUint32(ptr + ALLOCATION_HEADER.size, size);
    }

    getNext(ptr: number) {
        return this.dataView.getUint32(ptr + ALLOCATION_HEADER.nextPtr);
    }

    setNext(to: number, from: number) {
        this.dataView.setUint32(to + ALLOCATION_HEADER.nextPtr, this.getNext(from));
    }

    setAdjustment(ptr: number, adjustment: number) {
        this.dataView.setUint8(ptr + ALLOCATION_HEADER.adjustment, adjustment);
    }

    clear(): void {
        const adjustment = AllocatorHelper.alignForwardAdjustmentWithHeader(0, 1, ALLOCATION_HEADER.HEADER_SIZE);
        const ptrOfHeader = this._freeBlocksPtr + adjustment - ALLOCATION_HEADER.HEADER_SIZE;
        this.dataView.setUint32(ptrOfHeader + ALLOCATION_HEADER.size, this.byteSize - adjustment);
        this.dataView.setInt32(ptrOfHeader + ALLOCATION_HEADER.nextPtr, -1);
        this.dataView.setUint8(ptrOfHeader + ALLOCATION_HEADER.adjustment, 1);
    }

    deallocate(byteOffset: number): void {}

    printMemory() {
        return new Uint8Array(this._arrayBuffer, this._offset, this._byteSize);
    }

    malloc(size: number, alignment: number): DataView {
        AllocatorHelper.checkParamsMalloc(size, alignment);

        let prevFreeBlockPtr: number | null = null;
        let freeBlockPtr: number | null = this._freeBlocksPtr;

        while (freeBlockPtr !== null) {
            const adjustments = AllocatorHelper.alignForwardAdjustmentWithHeader(
                freeBlockPtr,
                alignment,
                ALLOCATION_HEADER.HEADER_SIZE
            );

            let totalSize = size + alignment;

            if (this.getSize(freeBlockPtr) - totalSize < totalSize) {
                prevFreeBlockPtr = freeBlockPtr;
                freeBlockPtr = this.getNext(freeBlockPtr);

                continue;
            }

            if (this.getSize(freeBlockPtr) - totalSize <= ALLOCATION_HEADER.HEADER_SIZE) {
                totalSize = this.getSize(freeBlockPtr);
                if (prevFreeBlockPtr !== null) {
                    this.setNext(prevFreeBlockPtr, freeBlockPtr);
                } else {
                    this._freeBlocksPtr = this.getNext(freeBlockPtr);
                }
            } else {
                const nextBlockPtr = freeBlockPtr + totalSize;
                this.setSize(nextBlockPtr, this.getSize(freeBlockPtr) - totalSize);
                this.setNext(nextBlockPtr, freeBlockPtr);

                if (prevFreeBlockPtr !== null) {
                    this.setNext(prevFreeBlockPtr, nextBlockPtr);
                } else {
                    this._freeBlocksPtr = nextBlockPtr;
                }
            }

            const alignAddress = freeBlockPtr + adjustments;
            const headerAddress = alignAddress - ALLOCATION_HEADER.HEADER_SIZE;

            this.setSize(headerAddress, totalSize);
            this.setAdjustment(headerAddress, adjustments);

            this._usedMemory += totalSize;
            this._numAllocations++;

            return new DataView(this._arrayBuffer, this._offset + alignAddress, size);
        }

        return new DataView(this._arrayBuffer, this._offset);
    }
}
