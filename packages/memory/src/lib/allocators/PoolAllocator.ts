import { ALLOCATOR, AllocatorHelper } from '../../index';
import AllocatorIsFull from '../exceptions/AllocatorIsFull';
import AllocatorInterface, { MemoryPointer } from './AllocatorInterface';

export default class PoolAllocator implements AllocatorInterface {
    private readonly arrayBuffer: ArrayBuffer;

    private readonly dataView: DataView;
    private readonly _byteSize: number;
    private readonly _byteOffset: number;

    private _numAllocations: number;
    private _usedMemory: number;
    private _freeList = 0;
    private _tempFreeListPointer = 0;

    private readonly _objectSize: number;
    private readonly _alignment: number;

    get typeAllocator() {
        return ALLOCATOR.POOL;
    }
    get numAllocations(): number {
        return this._numAllocations;
    }

    get usedMemory(): number {
        return this._usedMemory;
    }

    get byteSize(): number {
        return this._byteSize;
    }

    constructor(memoryPointer: MemoryPointer, params: number[]) {
        this.arrayBuffer = memoryPointer.buffer;
        this.dataView = new DataView(memoryPointer.buffer, memoryPointer.byteOffset, memoryPointer.byteLength);
        this._byteSize = this.dataView.byteLength;
        this._byteOffset = this.dataView.byteOffset;
        this._numAllocations = 0;
        this._usedMemory = 0;
        this._objectSize = params[0] ?? 64;
        this._alignment = params[1] ?? 4;

        this.clear();
    }

    printMemory() {
        return new Uint8Array(this.arrayBuffer, this._byteOffset, this._byteSize);
    }

    clear(): void {
        const adjustment = AllocatorHelper.alignForwardAdjustment(this._byteOffset, this._alignment);
        this._freeList = adjustment;

        const objectsCount = Math.floor((this.byteSize - adjustment - 4) / this._objectSize);

        let p = this._freeList;

        for (let i = 0; i < objectsCount; i++) {
            p += this._objectSize;
            this.dataView.setInt32(p - this._objectSize, p);
        }

        this.dataView.setUint32(p, -1);
    }

    deallocate(byteOffset: number): void {
        byteOffset -= this._byteOffset;

        this.dataView.setInt32(byteOffset, this._freeList);
        this._freeList = byteOffset;

        this._usedMemory -= this._objectSize;
        this._numAllocations--;
    }

    malloc(size: number, alignment: number): MemoryPointer {
        if (size > this._objectSize || alignment !== this._alignment)
            throw new Error('size or alignment parameters are not correctly');

        if (this._freeList == -1) throw new AllocatorIsFull(this);
        this._tempFreeListPointer = this._freeList;
        this._freeList = this.dataView.getInt32(this._tempFreeListPointer);

        this._usedMemory += this._objectSize;
        this._numAllocations++;

        return {
            buffer: this.arrayBuffer,
            byteLength: size,
            byteOffset: this._byteOffset + this._tempFreeListPointer,
        };
    }
}
