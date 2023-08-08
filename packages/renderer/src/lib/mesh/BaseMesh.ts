import { AttributeGraphicsBuffer, IndicesGraphicsBuffer } from '../../index';
import { GraphicsBuffer, VertexAttributeDescriptor } from '../../index';
import { TYPED_ARRAY } from 'memory';

export default class BaseMesh {
    protected vertexCountElements = 0;
    protected vertexBuffer = new AttributeGraphicsBuffer();
    protected indexBuffer = new IndicesGraphicsBuffer();
    protected vertexAttributeDescriptor: { [index: number]: VertexAttributeDescriptor } = {};

    setVertexBufferParams(...list: VertexAttributeDescriptor[]) {
        for (const v of list) {
            this.vertexAttributeDescriptor[v.attribute] = v;
            this.vertexCountElements += v.dimension;
        }
    }

    setVertexBufferData(data: TYPED_ARRAY, dataStart = 0, meshBufferStart = 0) {
        this.vertexBuffer.setData(data);
    }
}
