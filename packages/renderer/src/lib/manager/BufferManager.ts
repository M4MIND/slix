import { GL_BUFFER_TARGET, GL_USAGE_BUFFER } from '../webgl.consts';
import { RendererServer } from 'renderer';

export default class BufferManager {
    private readonly context = RendererServer.contextManager;

    bindBuffer(target: GL_BUFFER_TARGET, buffer: WebGLBuffer) {
        this.context.bindBuffer(target, buffer);
    }

    createWebGLBuffer() {
        return this.context.createWebGLBuffer();
    }

    deleteWebGLBuffer(a: WebGLBuffer) {
        this.context.deleteWebGLBuffer(a);
    }

    makeVAO() {
        return this.context.createVertexArrayObject();
    }

    setData(target: GL_BUFFER_TARGET, src: ArrayBufferView, usage: GL_USAGE_BUFFER, srcOffset = 0, length = 0) {
        this.context.bufferData(target, src, usage, srcOffset, length);
    }

    setSubData(target: GL_BUFFER_TARGET, dstByteOffset: number, src: ArrayBufferView, srcOffset = 0, length = 0) {
        this.context.bufferSubData(target, dstByteOffset, src, srcOffset, length);

        return this;
    }
}
