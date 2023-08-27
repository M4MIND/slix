import { ALLOCATOR, AllocatorHelper } from '../../index';
import AllocatorInterface from './AllocatorInterface';

export default class LinearAllocator implements AllocatorInterface {
    public readonly typeAllocator: ALLOCATOR = ALLOCATOR.LINEAR;
    private readonly arrayBuffer: ArrayBuffer;
    private readonly dataView: DataView;
    private _usedMemory = 0;
    private _position = 0;
    private _numAllocations = 0;
    private _byteSize = 0;
    private readonly _byteOffset: number;
    public get byteSize() {
        return this._byteSize;
    }
    public get usedMemory() {
        return this._usedMemory;
    }

    public get numAllocations() {
        return this._numAllocations;
    }

    constructor(dataView: DataView) {
        this.arrayBuffer = dataView.buffer;
        this.dataView = dataView;

        this._byteOffset = this.dataView.byteOffset;
        this._byteSize = this.dataView.byteLength;

        this.clear();
    }

    private getAddress(size: number, alignment: number) {
        AllocatorHelper.checkParamsMalloc(size, alignment);

        const adjustment = AllocatorHelper.alignForwardAdjustment(this._position, alignment);

        if (this._usedMemory + adjustment + size > this._byteSize) return null;
        const aligned_address = this._position + adjustment;
        this._position = aligned_address + size;
        this._usedMemory += size + adjustment;
        this._numAllocations++;

        return aligned_address;
    }

    malloc(size: number, alignment: number): DataView {
        const address = this.getAddress(size, alignment);
        if (address == null)
            throw new Error(
                `Failed to allocate memory for ${size} bytes. ${this.byteSize - this.usedMemory} bytes available`
            );
        return new DataView(this.arrayBuffer, address + this._byteOffset, size);
    }
    clear(): void {
        this._usedMemory = 0;
        this._numAllocations = 0;
        this._position = 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deallocate(byteOffset: number): void {
        console.warn(`${LinearAllocator.name} Can't be deallocate. Please, use clear() method for deallocate all data`);
    }
}
