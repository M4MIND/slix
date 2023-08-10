import { TYPED_ARRAY } from '../types/DataType';
import Allocator from './Allocator';

enum ALLOCATOR_INFORMATION {
    BYTE_SIZE = 0,
    USED_MEMORY = 4,
    CURRENT_POSITION = 8,
    NUM_ALLOCATIONS = 12,
    HEADER_SIZE = 16,
}
export default class LinearAllocator extends Allocator {
    public get byteSize() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.BYTE_SIZE);
    }
    public get usedMemory() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.USED_MEMORY);
    }
    public get currentPosition() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.CURRENT_POSITION);
    }
    public get numAllocations() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.NUM_ALLOCATIONS);
    }
    private set byteSize(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.BYTE_SIZE, v);
    }

    private set usedMemory(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.USED_MEMORY, v);
    }

    private set currentPosition(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.CURRENT_POSITION, v);
    }

    private set numAllocations(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.NUM_ALLOCATIONS, v);
    }

    private readonly arrayBuffer: ArrayBuffer;
    private readonly dataView: DataView;

    constructor(byteSize: number) {
        super();
        this.arrayBuffer = new ArrayBuffer(byteSize);
        this.dataView = new DataView(this.arrayBuffer);
        this.usedMemory = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.currentPosition = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.byteSize = this.arrayBuffer.byteLength - ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.numAllocations = 0;
    }

    private getAddress(size: number, alignment: number) {
        this.checkSize(size);

        const adjustment = this.alignForwardAdjustment(this.currentPosition, alignment);

        if (this.usedMemory + adjustment + size > this.byteSize) return null;

        const aligned_address = this.currentPosition + adjustment;
        this.currentPosition = aligned_address + size;
        this.usedMemory = this.usedMemory + size + adjustment;

        this.numAllocations = this.numAllocations + 1;

        return aligned_address;
    }

    malloc(size: number, alignment: number): DataView {
        const address = this.getAddress(size, alignment);
        if (!address)
            throw new Error(
                `Failed to allocate memory for ${size} bytes. ${this.byteSize - this.usedMemory} bytes available `
            );
        return new DataView(this.arrayBuffer, address, size);
    }
    clear(): void {
        this.numAllocations = 0;
        this.usedMemory = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.currentPosition = ALLOCATOR_INFORMATION.HEADER_SIZE;
    }
    deallocate(dataView: TYPED_ARRAY): void {
        throw new Error('Please, use Clear() method');
    }
}
