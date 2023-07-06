export default abstract class BaseAllocator {
    public readonly arrayBuffer: ArrayBuffer;
    protected dataView: DataView;
    protected constructor(mbSize: number) {
        this.arrayBuffer = new ArrayBuffer(mbSize * 1024 * 1024);
        this.dataView = new DataView(this.arrayBuffer);
    }

    public abstract alloc(byteSize: number): DataView;

    public abstract dealloc(): void;
}
