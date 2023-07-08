export default abstract class BaseAllocator {
    public readonly arrayBuffer: ArrayBuffer;
    protected dataView: DataView;
    public readonly byteSize;
    protected constructor(mbSize: number) {
        this.arrayBuffer = new ArrayBuffer(mbSize * 1024 * 1024);
        this.dataView = new DataView(this.arrayBuffer);
        this.byteSize = this.arrayBuffer.byteLength;
    }

    public abstract alloc(byteSize: number): DataView | null;

    public abstract dealloc(dataView: DataView): void;
}
