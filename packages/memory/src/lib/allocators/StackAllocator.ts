import { AllocatorHelper } from '../../index';
import AllocatorIsFull from '../exceptions/AllocatorIsFull';
import { ALLOCATOR } from '../types/DataType';
import AllocatorInterface from './AllocatorInterface';

enum MARKER {
    ADJUSTMENT = 4,
    HEADER_SIZE = 4,
}

enum ALLOCATOR_INFORMATION {
    BYTE_SIZE = 0,
    USED_MEMORY = 4,
    CURRENT_POSITION = 8,
    NUM_ALLOCATIONS = 12,
    HEADER_SIZE = 16,
}

export default class StackAllocator implements AllocatorInterface {
    private arrayBuffer: ArrayBuffer;
    private dataView: DataView;

    get typeAllocator() {
        return ALLOCATOR.STACK;
    }

    public get byteSize() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.BYTE_SIZE);
    }

    private set byteSize(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.BYTE_SIZE, v);
    }

    public get currentPosition() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.CURRENT_POSITION);
    }

    private set currentPosition(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.CURRENT_POSITION, v);
    }

    public get usedMemory() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.USED_MEMORY);
    }

    private set usedMemory(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.USED_MEMORY, v);
    }

    public get numAllocations() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.NUM_ALLOCATIONS);
    }

    private set numAllocations(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.NUM_ALLOCATIONS, v);
    }

    constructor(dataView: DataView) {
        this.arrayBuffer = dataView.buffer;
        this.dataView = dataView;

        this.clear();
    }

    private getAddress(size: number, alignment: number) {
        AllocatorHelper.checkParamsMalloc(size, alignment);

        const adjustment = AllocatorHelper.alignForwardAdjustmentWithHeader(
            this.currentPosition,
            alignment,
            MARKER.ADJUSTMENT
        );

        if (this.usedMemory + adjustment + size > this.arrayBuffer.byteLength) return null;

        const aligned_address = adjustment + this.currentPosition;
        const headerAddress = aligned_address - MARKER.HEADER_SIZE;

        this.dataView.setUint32(headerAddress, adjustment);

        this.currentPosition = aligned_address + size;
        this.usedMemory += size + adjustment;
        this.numAllocations = this.numAllocations + 1;

        return aligned_address;
    }

    malloc(size: number, alignment: number): DataView {
        const address = this.getAddress(size, alignment);
        if (!address) throw new AllocatorIsFull(this);

        return new DataView(this.arrayBuffer, address, size);
    }
    deallocate(byteOffset: number) {
        const headerAddress = byteOffset - MARKER.HEADER_SIZE;
        this.usedMemory -= this.currentPosition - byteOffset + this.dataView.getUint32(headerAddress);
        this.currentPosition = byteOffset - this.dataView.getUint32(headerAddress);

        this.numAllocations = this.numAllocations - 1;
    }

    public clear() {
        this.byteSize = this.arrayBuffer.byteLength - ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.currentPosition = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.usedMemory = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.numAllocations = 0;
    }
}
