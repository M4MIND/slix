import { TYPED_ARRAY } from '../types/DataType';
import Allocator from './Allocator';

enum ALLOCATION_HEADER {
    SIZE = 4,
    USED = 1,
    ADJUSTMENTS = 1,
    HEADER_SIZE = 6,
}

enum FREE_BLOCK {
    SIZE = 0,
    NEXT = 4,
    HEADER_SIZE = 8,
}
export default class FreeListAllocator extends Allocator {
    public readonly arrayBuffer: ArrayBuffer;
    public readonly dataView: DataView;
    public get byteSize(): number {
        return 4;
    }

    private set byteSize(v: number) {}

    public get usedMemory(): number {
        return 4;
    }

    private set usedMemory(v: number) {}

    public get numAllocations(): number {
        return 4;
    }

    private set numAllocations(v: number) {}

    constructor(byteSize: number) {
        super();
        this.arrayBuffer = new ArrayBuffer(byteSize);
        this.dataView = new DataView(this.arrayBuffer);

        this.dataView.setUint32(FREE_BLOCK.SIZE, this.arrayBuffer.byteLength);
        this.dataView.setUint32(FREE_BLOCK.NEXT, 0);
    }
    private setFreeBlock(address: number, byteSize: number, next: number) {
        this.dataView.setUint32(address + FREE_BLOCK.SIZE, byteSize - FREE_BLOCK.HEADER_SIZE);
        this.dataView.setUint32(address + FREE_BLOCK.NEXT, next);
    }

    private addedHeader(address: number, size: number, used: boolean, adjustments: number) {}

    deallocate(dataView: TYPED_ARRAY): void {}

    malloc(size: number, alignment: number): DataView {
        return new DataView(this.arrayBuffer);
    }
}
