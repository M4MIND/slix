import { GL_BUFFERS, GL_USAGE_BUFFER } from '../consts';

export default abstract class GpuBufferBase {
    constructor(
        private readonly buffer: WebGLBuffer,
        public readonly type: GL_BUFFERS,
        public readonly usage: GL_USAGE_BUFFER,
        public data: Int8Array | Int16Array | Int32Array | Float32Array | Float64Array
    ) {}


    public set(value: number[]): GpuBufferBase {
        if (this.data.length !== value.length) {
            this.data = this.createArray(value);

            return this;
        }

        this.data.set(value);

        return this;
    }

    public abstract createArray(data: number[]): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
}
