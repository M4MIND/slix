import { RendererServer } from '../../index';
import { GL_BUFFER_TARGET, GL_USAGE_BUFFER } from '../webgl.consts';

export default class BufferData {
    private readonly context = RendererServer.contextManager;
    private static readonly context = RendererServer.contextManager;

    constructor(private readonly buffer: WebGLBuffer, private target: GL_BUFFER_TARGET, private usage: GL_USAGE_BUFFER) {
    }

    bind() {
        this.context.bindBuffer(this.target, this.buffer);
    }

    set(data: ArrayBufferView, srcOffset = 0, length = 0) {
        this.context.bufferData(this.target, data, this.usage, srcOffset, length);
    }

    setSub(data: ArrayBufferView, dstByteOffset = 0, srcOffset = 0, length = 0) {
        this.context.bufferSubData(this.target, dstByteOffset, data, srcOffset, length);
    }

    static make(target: GL_BUFFER_TARGET, usage: GL_USAGE_BUFFER) {
        return this.context.createBufferData(target, usage);
    }
}