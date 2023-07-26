import Allocator, { ALIGNMENT } from './Allocator';

export default class PoolAllocator {
    private arrayBuffer: ArrayBuffer;
    private dataView: DataView;

    constructor() {
        super();

        this.arrayBuffer = new ArrayBuffer(64 * 1024 * 1024);
        this.dataView = new DataView(this.arrayBuffer);
    }
    allocate(size: number, alignment: number): DataView | null {
        return undefined;
    }

    deallocate(dataView: DataView): void {}

    get byteSize(): number {
        return 0;
    }

    get numAllocations(): number {
        return 0;
    }

    get usedMemory(): number {
        return 0;
    }
}
