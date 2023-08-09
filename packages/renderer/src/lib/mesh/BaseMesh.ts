import { AttributeGraphicsBuffer, IndicesGraphicsBuffer, MESH_TOPOLOGY } from '../../index';
import { GraphicsBuffer, VertexAttributeDescriptor } from '../../index';
import { TYPED_ARRAY } from 'memory';

export default class BaseMesh {
    private _vertexCountElements = 0;
    protected _vertexBuffer = new AttributeGraphicsBuffer();
    protected _indexBuffer = new IndicesGraphicsBuffer();
    protected vertexAttributeDescriptor: { [index: string]: VertexAttributeDescriptor } = {};
    public _byteSizeOfOneVertex = 0;
    public topology = MESH_TOPOLOGY.TRIANGLES;

    get vertexBuffer() {
        return this._vertexBuffer;
    }

    get indexBuffer() {
        return this._indexBuffer;
    }

    get attributeOneSize() {
        return this._vertexCountElements;
    }

    setVertexBufferParams(...list: VertexAttributeDescriptor[]) {
        for (const v of list) {
            this.vertexAttributeDescriptor[v.attribute] = v;
            this._vertexCountElements += v.dimension;
        }
    }

    getVertexBufferParams() {
        return Object.values(this.vertexAttributeDescriptor);
    }

    setVertexBufferData(data: TYPED_ARRAY, dataStart = 0, meshBufferStart = 0) {
        this._vertexBuffer.setData(data);
    }
}
