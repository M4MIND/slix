import { AllocatorHelper } from '../../index';
import { TYPED_ARRAY } from '../types/DataType';
import Allocator from './Allocator';

enum ALLOCATOR_INFORMATION {
    CURRENT_POSITION = 4,
    NUM_ALLOCATIONS = 8,
    HEADER_SIZE = 12,
}
export default class LinearAllocator implements Allocator {
    private readonly arrayBuffer: ArrayBuffer;
    private readonly dataView: DataView;
    private _usedMemory = 0;
    private _position = 0;
    private _numAllocations = 0;
    public get byteSize() {
        return this.dataView.byteLength;
    }
    public get usedMemory() {
        return this._usedMemory;
    }
    private set usedMemory(v: number) {
        this._usedMemory = v;
    }
    public get currentPosition() {
        return this._position;
    }
    private set currentPosition(v: number) {
        this._position = v;
    }

    public get numAllocations() {
        return this._numAllocations;
    }

    private set numAllocations(v: number) {
        this._numAllocations = v;
    }

    constructor(dataView: DataView) {
        this.arrayBuffer = dataView.buffer;
        this.dataView = dataView;
        this.usedMemory = 0;
        this.numAllocations = 0;
        this.currentPosition = 0;
    }

    private getAddress(size: number, alignment: number) {
        AllocatorHelper.checkSize(size);

        const adjustment = AllocatorHelper.alignForwardAdjustment(this.currentPosition, alignment);

        if (this.usedMemory + adjustment + size > this.byteSize) return null;

        const aligned_address = this.currentPosition + adjustment;
        this.currentPosition = aligned_address + size;
        this.usedMemory = this.usedMemory + size + adjustment;

        this.numAllocations = this.numAllocations + 1;

        return aligned_address;
    }

    malloc(size: number, alignment: number): DataView {
        const address = this.getAddress(size, alignment);
        if (address == null)
            throw new Error(
                `Failed to allocate memory for ${size} bytes. ${this.byteSize - this.usedMemory} bytes available `
            );
        return new DataView(this.arrayBuffer, address + this.dataView.byteOffset, size);
    }
    clear(): void {
        this.numAllocations = 0;
        this.usedMemory = 0;
        this.currentPosition = this.dataView.byteOffset;
    }
    deallocate(byteOffset: number): void {
        console.warn('Please, use Clear() method');
    }
}
