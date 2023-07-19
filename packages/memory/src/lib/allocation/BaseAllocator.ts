export default abstract class BaseAllocator {
    protected dataView: DataView;
    public readonly byteSize;
    protected constructor(public readonly arrayBuffer: ArrayBuffer) {
        this.dataView = new DataView(this.arrayBuffer);
        this.byteSize = this.arrayBuffer.byteLength;
    }

    public abstract alloc(byteSize: number): DataView | null;

    public abstract dealloc(dataView: DataView): void;
}
