import { GL_BUFFER_TARGET } from '../webgl.consts';
import { RendererServer } from 'renderer';

export default class BufferWrapper {
    protected readonly context = RendererServer.contextManager;
    protected buffer: WebGLBuffer;

    constructor(private readonly target: GL_BUFFER_TARGET) {
        this.buffer = this.context.createBuffer();
    }

    public bind() {
        this.context.bindBuffer(this.target, this.buffer);
    }
}
