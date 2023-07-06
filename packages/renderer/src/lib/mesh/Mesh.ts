import GraphicsBuffer from '../buffer/GraphicsBuffer';
import { GL_BUFFER_TARGET } from '../webgl.consts';
import VertexAttributeDescriptor from './VertexAttributeDescriptor';

export default class Mesh {
    private readonly vertexBuffer: GraphicsBuffer;
    private readonly indexBuffer: GraphicsBuffer;
    private readonly vertexAttributeDescriptors: { [index: string]: VertexAttributeDescriptor } = {};

    constructor() {
        this.vertexBuffer = new GraphicsBuffer(GL_BUFFER_TARGET.ELEMENT_ARRAY_BUFFER);
        this.indexBuffer = new GraphicsBuffer(GL_BUFFER_TARGET.ELEMENT_ARRAY_BUFFER);
    }

    public setVertexBufferParams(vertexDescriptor: VertexAttributeDescriptor[], vertexCount: number) {
        return this;
    }

    public setVertexBufferData<T>(data: T, dataStart: number, meshBufferStart: number, count: number, stream: number) {
        return this;
    }

    public setIndexBufferParams() {}

    public setIndexBufferData() {}
}
