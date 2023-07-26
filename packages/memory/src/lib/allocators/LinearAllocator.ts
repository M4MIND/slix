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

    private set byteSize(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.BYTE_SIZE, v);
    }

    public get usedMemory() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.USED_MEMORY);
    }

    private set usedMemory(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.USED_MEMORY, v);
    }

    public get currentPosition() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.CURRENT_POSITION);
    }

    private set currentPosition(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.CURRENT_POSITION, v);
    }

    public get numAllocations() {
        return this.dataView.getUint32(ALLOCATOR_INFORMATION.NUM_ALLOCATIONS);
    }

    private set numAllocations(v: number) {
        this.dataView.setUint32(ALLOCATOR_INFORMATION.NUM_ALLOCATIONS, v);
    }

    private readonly arrayBuffer: ArrayBuffer;
    private readonly dataView: DataView;

    constructor() {
        super();
        this.arrayBuffer = new ArrayBuffer(64 * 1024 * 1024);
        this.dataView = new DataView(this.arrayBuffer);
        this.usedMemory = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.currentPosition = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.byteSize = this.arrayBuffer.byteLength - ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.numAllocations = 0;
    }

    malloc(size: number, alignment: number): DataView | null {
        this.checkSize(size);

        const adjustment = this.alignForwardAdjustment(this.currentPosition, alignment);

        if (this.usedMemory + adjustment + size > this.byteSize) return null;

        const aligned_address = this.currentPosition + adjustment;
        this.currentPosition = aligned_address + size;
        this.usedMemory = this.usedMemory + size + adjustment;

        this.numAllocations = this.numAllocations + 1;

        return new DataView(this.arrayBuffer, aligned_address, size);
    }

    override deallocate(dataView: DataView) {
        console.warn(`LinearAllocator can't be deallocate. Please, use Clear method`);
    }

    clear(): void {
        this.numAllocations = 0;
        this.usedMemory = ALLOCATOR_INFORMATION.HEADER_SIZE;
        this.currentPosition = ALLOCATOR_INFORMATION.HEADER_SIZE;
    }
}
