import { RendererServer } from '../RendererServer';
import { GL_BUFFER_PARAMS, GL_BUFFER_TARGET, GL_USAGE_BUFFER, GL_VERTEX_ATTRIBUTE_FORMAT } from '../webgl.enums';
import { TYPED_ARRAY } from 'memory';

export enum GraphicsBufferUsageFlag {
    None = 0,
    LockBuffer = 1,
}

export default class GraphicsBuffer {
    get count(): number {
        return this._count;
    }
    public readonly bufferHandle: WebGLBuffer;
    constructor(
        public readonly target: GL_BUFFER_TARGET = GL_BUFFER_TARGET.ARRAY_BUFFER,
        public readonly type: GL_VERTEX_ATTRIBUTE_FORMAT = GL_VERTEX_ATTRIBUTE_FORMAT.Float32,
        public readonly usageFlag: GraphicsBufferUsageFlag = GraphicsBufferUsageFlag.None,
        public readonly usage: GL_USAGE_BUFFER = GL_USAGE_BUFFER.STATIC_DRAW,
        public readonly elementSize: number = 3
    ) {
        this.bufferHandle = RendererServer.contextManager.createWebGLBuffer();
    }
    private _count = 0;

    bind() {
        RendererServer.contextManager.bindBuffer(this.target, this.bufferHandle);
    }

    private unbind() {
        RendererServer.contextManager.unbindBuffer(this.target);
    }

    setData(array: TYPED_ARRAY) {
        this.bind();
        this._count = array.length;
        RendererServer.contextManager.bufferData(this.target, array, this.usage);
    }

    getBufferSize(): number {
        this.bind();
        return RendererServer.contextManager.getBufferParameter(this.target, GL_BUFFER_PARAMS.BUFFER_SIZE);
    }

    getData(array: TYPED_ARRAY) {
        this.bind();
        RendererServer.contextManager.getBufferSubData(this.target, 0, array);
        return array;
    }

    release() {
        RendererServer.contextManager.deleteWebGLBuffer(this.bufferHandle);
    }
}
