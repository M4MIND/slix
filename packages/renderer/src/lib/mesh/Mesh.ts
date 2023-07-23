import VertexAttributeDescriptor from './VertexAttributeDescriptor';
import BufferData from '../buffer/BufferData';
import { GL_BUFFER_TARGET, GL_USAGE_BUFFER } from '../webgl.consts';

export default class Mesh {
    private readonly attributesBuffer = BufferData.make(GL_BUFFER_TARGET.ARRAY_BUFFER, GL_USAGE_BUFFER.STATIC_DRAW);
    private readonly indicesBuffer = BufferData.make(GL_BUFFER_TARGET.ELEMENT_ARRAY_BUFFER, GL_USAGE_BUFFER.STATIC_DRAW);
    public SetVertexBufferParams(vertexCount: number, layout: VertexAttributeDescriptor[]) {

    }

    public setVertexBufferData(data: DataView, count: number) {

    }
}
