import { RendererServer } from '../../index';
import BufferManager from '../manager/BufferManager';
import { GL_BUFFER_TARGET, GL_USAGE_BUFFER } from '../webgl.consts';

export default class GraphicsBuffer {
    private readonly bufferHandler: WebGLBuffer;
    private readonly bufferManager: BufferManager;

    constructor(
        public readonly target: GL_BUFFER_TARGET,
        public readonly usage: GL_USAGE_BUFFER = GL_USAGE_BUFFER.STATIC_DRAW
    ) {
        this.bufferManager = RendererServer.bufferManager;
        this.bufferHandler = this.bufferManager.createWebGLBuffer();
    }

    private bind() {
        this.bufferManager.bindBuffer(this.target, this.bufferHandler);
    }

    setData(data: ArrayBufferView, srcOffset = 0, length = 0) {
        this.bind();
        this.bufferManager.setData(this.target, data, this.usage, srcOffset, length);
    }

    release() {
        this.bufferManager.deleteWebGLBuffer(this.bufferHandler);
    }
}
