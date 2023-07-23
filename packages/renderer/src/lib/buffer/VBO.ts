import WebGlBuffer from './WebGlBuffer';
import { RendererServer } from '../../index';

export default class VBO implements WebGlBuffer {
    constructor(buffer: WebGLBuffer) {
    }
    bind(): this {
        return this;
    }

    delete(): this {
        return this;
    }

    unbind(): this {
        return this;
    }
}