import WebGlBuffer from './WebGlBuffer';
import { RendererServer } from '../../index';

export default class VAO implements WebGlBuffer {
    private readonly context = RendererServer.contextManager;

    constructor(private readonly buffer: WebGLVertexArrayObject) {
    }

    bind(): this {
        this.context.bindVertexArray(this.buffer);

        return this;
    }

    delete(): this {
        this.context.deleteVertexArray(this.buffer);

        return this;
    }

    unbind(): this {
        this.context.unbindVertexArray();

        return this;
    }
}