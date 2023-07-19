import BaseAllocator from './BaseAllocator';

export default class LinearAllocation extends BaseAllocator {
    private marker = 0;

    constructor(arrayBuffer: ArrayBuffer) {
        super(arrayBuffer);
    }

    public alloc(byteSize: number): DataView {
        const dataView = new DataView(this.arrayBuffer, this.marker, byteSize);

        this.marker += byteSize;

        return dataView;
    }

    dealloc(): void {}

    public getMarker(): number {
        return this.marker;
    }

    public clear(): void {
        this.marker = 0;
    }
}
