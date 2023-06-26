import { GL_BUFFERS, GL_USAGE_BUFFER } from '../consts';

import GpuBufferBase from './GpuBufferBase';

export default class GpuBuffer32Int extends GpuBufferBase {
    constructor(buffer: WebGLBuffer, type: GL_BUFFERS, usage: GL_USAGE_BUFFER) {
        super(buffer, type, usage, new Int32Array());
    }

    public override createArray(data: number[]): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array {
        return new Int32Array(data);
    }
}
