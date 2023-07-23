import WebGlBuffer from './WebGlBuffer';

export default class EBO implements WebGlBuffer {
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