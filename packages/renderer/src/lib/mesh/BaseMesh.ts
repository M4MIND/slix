import { GraphicsBuffer, VertexAttributeDescriptor } from '../../index';

export default class BaseMesh {
    private graphicsBuffer: { [index: number]: GraphicsBuffer } = {};
    setVertexBufferParams(list: VertexAttributeDescriptor[]) {}
    public setVertexBuffer(index: number, buffer: GraphicsBuffer) {
        this.graphicsBuffer[index] = buffer;
    }
}
