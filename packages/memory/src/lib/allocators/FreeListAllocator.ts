import Allocator, { ALIGNMENT } from './Allocator';

enum ALLOCATION_HEADER {
    BYTE_SIZE = 0,
    ADJUSTMENT = 4,
    HEADER_SIZE = 8,
}

enum FREE_BLOCK {
    BYTE_SIZE_OFFSET = 0,
    NEXT_OFFSET = 4,
    HEADER_SIZE = 8,
}

enum ALLOCATOR_INFORMATION {
    BYTE_SIZE = 0,
    USED_MEMORY = 4,
    NUM_ALLOCATIONS = 8,
    HEADER_SIZE = 12,
}

export default class FreeListAllocator extends Allocator {
    public get byteSize(): number {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.BYTE_SIZE);
    }

    private set byteSize(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.BYTE_SIZE, v);
    }

    public get usedMemory(): number {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.USED_MEMORY);
    }

    private set usedMemory(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.USED_MEMORY, v);
    }

    public get numAllocations(): number {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.NUM_ALLOCATIONS);
    }

    private set numAllocations(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.NUM_ALLOCATIONS, v);
    }

    public readonly arrayBuffer: ArrayBuffer;
    public readonly dataView: DataView;

    constructor() {
        super();
        this.arrayBuffer = new ArrayBuffer(64 * 1024 * 1024);
        this.dataView = new DataView(this.arrayBuffer);

        this.byteSize = this.arrayBuffer.byteLength - ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.usedMemory = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.numAllocations = 0;

        this.dataView.setUint32(ALLOCATOR_INFORMATION.HEADER_SIZE + FREE_BLOCK.BYTE_SIZE_OFFSET, this.byteSize);
        this.dataView.setUint32(ALLOCATOR_INFORMATION.HEADER_SIZE + FREE_BLOCK.NEXT_OFFSET, 0);
    }

    malloc(size: number, alignment: ALIGNMENT): DataView | null {
        return null;
    }

    deallocate(dataView: DataView): void {}

    // private getFreeAddress(address: number): boolean {
    //     return this.dataView.getUint32(ALLOCATOR_INFORMATION.HEADER_SIZE + FREE_BLOCK.USED) === 1;
    // }
}
