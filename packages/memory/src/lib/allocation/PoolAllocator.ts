import { TypedArray } from '../../index';

class Chunk {
    public next?: Chunk;

    constructor(public readonly index: number) {}
}

export default class PoolAllocator {
    private readonly buffer: ArrayBuffer;
    private readonly view: DataView;
    private chunk: Chunk = new Chunk(0);
    private bytesLength: number;
    private readonly size: number;

    constructor(
        mbSize = 64,
        private readonly chunkSize: number = 256,
        private readonly blockSize: number = 4,
        private marker: number = 0
    ) {
        this.size = 1024 * 1024 * mbSize;

        if (this.size % (chunkSize * blockSize) != 0) {
            throw new Error(`Can't create PoolAllocator`);
        }
        this.buffer = new ArrayBuffer(this.size);
        this.view = new DataView(this.buffer);
        this.bytesLength = this.chunkSize * this.blockSize;
    }

    public allocate(): Chunk {
        if (!this.chunk.next) {
            this.chunk = this.allocateBlock();
        }

        const freeChunk = this.chunk;

        this.chunk = this.chunk.next as Chunk;

        return freeChunk;
    }

    public deallocate(chunk: Chunk) {
        chunk.next = this.chunk;

        this.chunk = chunk;
    }

    public getArrayByChunk(
        chunk: Chunk,
        type: new (buffer: ArrayBuffer, byteOffset: number, length: number) => TypedArray,
        perByteSize: number
    ) {
        return new type(this.buffer, chunk.index, this.bytesLength / perByteSize);
    }

    private allocateBlock() {
        const blockBegin = new Chunk(this.marker);

        this.marker += this.chunkSize * this.blockSize;

        blockBegin.next = new Chunk(this.marker);

        return blockBegin;
    }
}
