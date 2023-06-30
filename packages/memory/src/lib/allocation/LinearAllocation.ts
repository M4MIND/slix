import { TypedArray } from '../../index';
import * as buffer from 'buffer';

export default class LinearAllocation {
    private readonly arrayBuffer: ArrayBuffer;
    private readonly byteLength: number;
    private viewer: DataView;
    private marker: number;

    constructor(mbSize: number) {
        const mb = mbSize * 1024 * 1024;
        this.arrayBuffer = new ArrayBuffer(mb);
        this.viewer = new DataView(this.arrayBuffer);
        this.byteLength = this.arrayBuffer.byteLength;
        this.marker = 0;
    }

    public alloc<T>(
        type: new (buffer: ArrayBuffer, byteOffset: number, length: number) => T,
        length: number,
        word_size: number
    ): T {
        const bytesNeed: number = length * word_size;

        if (this.marker + bytesNeed > this.byteLength) {
            throw new Error(
                `${LinearAllocation.name}: Out of memory \nSize: ${this.byteLength} \nFree: ${
                    this.byteLength - this.marker
                } \nNeed: ${this.marker + bytesNeed}`
            );
        }

        this.marker += bytesNeed;
        return new type(this.arrayBuffer, this.marker - bytesNeed, length);
    }

    public getMarker(): number {
        return this.marker;
    }

    public clear(): void {
        this.marker = 0;
        new Int32Array(this.arrayBuffer).fill(0);
    }
}
