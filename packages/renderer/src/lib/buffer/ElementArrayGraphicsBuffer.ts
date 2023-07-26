import { GL_BUFFER_TARGET, GL_USAGE_BUFFER } from './../webgl.enums';
import GraphicsBuffer from './GraphicsBuffer';

export default class ElementArrayGraphicsBuffer extends GraphicsBuffer {
    constructor(usage: GL_USAGE_BUFFER = GL_USAGE_BUFFER.STATIC_DRAW) {
        super(GL_BUFFER_TARGET.ELEMENT_ARRAY_BUFFER, usage);
    }

    override setData(data: Uint8Array | Uint16Array | Uint32Array, srcOffset = 0, length = 0) {
        super.setData(data, srcOffset, length);
    }
}
