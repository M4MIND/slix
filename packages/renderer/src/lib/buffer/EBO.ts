import WebGlBuffer from './WebGlBuffer';

export default class EBO implements WebGlBuffer {
    constructor() {}
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
