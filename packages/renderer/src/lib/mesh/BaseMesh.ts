import { AttributeGraphicsBuffer, IndicesGraphicsBuffer, MESH_TOPOLOGY } from '../../index';
import { GraphicsBuffer, VertexAttributeDescriptor } from '../../index';
import { VertexAttributeFormatByteSize } from './VertexAttributeDescriptor';
import { TYPED_ARRAY } from 'memory';

export default class BaseMesh {
    protected vertexAttributeDescriptor: { [index: string]: VertexAttributeDescriptor } = {};
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

        let offset = 0;

        for (const v of list) {
            v.offset = offset;
            this.vertexAttributeDescriptor[v.attribute] = v;
            this._vertexCountElements += v.dimension;
            offset += v.dimension * VertexAttributeFormatByteSize[v.byteSize];
        }
    }

    getVertexBufferParams() {
        return Object.values(this.vertexAttributeDescriptor);
    }

    setVertexBufferData(data: TYPED_ARRAY, dataStart = 0, meshBufferStart = 0) {
        this._vertexBuffer.setData(data);
    }
}
