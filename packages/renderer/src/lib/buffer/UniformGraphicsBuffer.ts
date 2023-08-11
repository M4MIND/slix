import {
    GL_BUFFER_TARGET,
    GL_USAGE_BUFFER,
    GL_VERTEX_ATTRIBUTE_FORMAT,
    GraphicsBuffer,
    GraphicsBufferUsageFlag,
} from '../../index';

export class UniformGraphicsBuffer extends GraphicsBuffer {
    constructor(
        elementSize = 3,
        type: GL_VERTEX_ATTRIBUTE_FORMAT = GL_VERTEX_ATTRIBUTE_FORMAT.Float32,
        usageFlag: GraphicsBufferUsageFlag = GraphicsBufferUsageFlag.None,
        usage: GL_USAGE_BUFFER = GL_USAGE_BUFFER.STATIC_DRAW
    ) {
        super(GL_BUFFER_TARGET.UNIFORM_BUFFER, type, usageFlag, usage, elementSize);
    }
}
