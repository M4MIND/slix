import { AttributeGraphicsBuffer, IndicesGraphicsBuffer, MESH_TOPOLOGY } from '../../index';
import { GraphicsBuffer, VertexAttributeDescriptor } from '../../index';
import { VertexAttributeFormatByteSize } from './VertexAttributeDescriptor';
import { TYPED_ARRAY } from 'memory';

export default class BaseMesh {
    protected vertexAttributeDescriptor: VertexAttributeDescriptor[] = [];
    public topology = MESH_TOPOLOGY.TRIANGLES;
    private _vertexCountElements = 0;
    private _byteSizeOfOneVertexPack = 0;
    protected _vertexBuffer = new AttributeGraphicsBuffer();
    protected _indexBuffer = new IndicesGraphicsBuffer();
    public _byteSizeOfOneVertex = 0;

    get vertexBuffer() {
        return this._vertexBuffer;
    }

    get indexBuffer() {
        return this._indexBuffer;
    }

    get attributeOneSize() {
        return this._vertexCountElements;
    }

    get byteSizeOfOneVertexPack() {
        return this._byteSizeOfOneVertexPack;
    }

    setVertexBufferParams(...list: VertexAttributeDescriptor[]) {
        this._byteSizeOfOneVertexPack = 0;

        for (const v of list) {
            this._byteSizeOfOneVertexPack += v.dimension * VertexAttributeFormatByteSize[v.byteSize];
        }

        for (const v of list) {
            this.vertexAttributeDescriptor.push(v);
            this._vertexCountElements += v.dimension;
        }
    }

    getVertexBufferParams() {
        return this.vertexAttributeDescriptor;
    }

    setVertexBufferData(data: TYPED_ARRAY) {
        this._vertexBuffer.setData(data);
    }

    setIndexBufferData(data: TYPED_ARRAY) {
        this._indexBuffer.setData(data);
    }
}
