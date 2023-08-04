import { GL_BUFFER_TARGET, GL_USAGE_BUFFER, GL_VERTEX_ATTRIBUTE_FORMAT } from '../webgl.enums';
import GraphicsBuffer, { GraphicsBufferUsageFlag } from './GraphicsBuffer';

export default class AttributeGraphicsBuffer extends GraphicsBuffer {
    constructor(
        elementSize = 3,
        type: GL_VERTEX_ATTRIBUTE_FORMAT = GL_VERTEX_ATTRIBUTE_FORMAT.Float32,
        usageFlag: GraphicsBufferUsageFlag = GraphicsBufferUsageFlag.None,
        usage: GL_USAGE_BUFFER = GL_USAGE_BUFFER.STATIC_DRAW
    ) {
        super(GL_BUFFER_TARGET.ARRAY_BUFFER, type, usageFlag, usage, elementSize);
    }
}
