export default class PoolAllocator {
    private arrayBuffer: ArrayBuffer;
    private dataView: DataView;

    constructor() {
        this.arrayBuffer = new ArrayBuffer(64 * 1024 * 1024);
        this.dataView = new DataView(this.arrayBuffer);
    }
}
