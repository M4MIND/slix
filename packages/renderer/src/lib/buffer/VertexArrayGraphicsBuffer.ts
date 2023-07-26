import { GraphicsBuffer } from '../../index';
import { GL_BUFFER_TARGET, GL_USAGE_BUFFER } from '../webgl.enums';

export default class VertexArrayGraphicsBuffer extends GraphicsBuffer {
    constructor(usage: GL_USAGE_BUFFER = GL_USAGE_BUFFER.STATIC_DRAW) {
        super(GL_BUFFER_TARGET.ARRAY_BUFFER, usage);
    }

    override setData(data: Float32Array, srcOffset = 0, length = 0) {
        super.setData(data, srcOffset, length);
    }
}
