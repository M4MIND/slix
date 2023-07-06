import BaseAllocator from './BaseAllocator';

export default class LinearAllocation extends BaseAllocator {
    public readonly byteLength: number;
    private marker: number;

    constructor(mbSize: number) {
        super(mbSize);

        this.byteLength = this.arrayBuffer.byteLength;
        this.marker = 0;
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
