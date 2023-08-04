import { GL_USAGE_BUFFER, GraphicsBuffer } from '../../index';
import { RendererServer } from '../RendererServer';
import { MESH_TOPOLOGY } from '../mesh.enums';
import RendererParams from '../renderer/RendererParams';
import { GL_DATA_UNSIGNED_INT, GL_DATA_UNSIGNED_SHORT, GL_DEPTH_TEST } from '../webgl.consts';
import WebGL2ContextManager from './WebGL2ContextManager';

export default class GraphicsManager {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;
    constructor() {
        //
    }
    public drawElementsInstanced(
        rendererParams: RendererParams,
        topology: MESH_TOPOLOGY,
        indexBuffer: GraphicsBuffer,
        indexCount: number,
        startIndex = 0,
        instanceCount: number
    ) {}

    public drawElements(
        rendererParams: RendererParams,
        topology: MESH_TOPOLOGY,
        indexBuffer: GraphicsBuffer,
        indexCount: number,
        startIndex = 0
    ) {
        this.context.clearColor(0, 0, 0.2, 1);
        this.context.clear();
        this.context.enable(GL_DEPTH_TEST);
        this.context.depthFunc();

        rendererParams.material.shader.use();

        for (const bufferKey of rendererParams.materialPropertyBlock.getBuffersKeys()) {
            const buffer = rendererParams.materialPropertyBlock.getBufferByKey(bufferKey);
            buffer.bind();
            this.context.vertexAttributePointer(
                rendererParams.material.shader.getPropertyAttributeId(bufferKey),
                buffer.elementSize,
                buffer.type
            );
        }

        this.context.uniformMatrix(
            rendererParams.material.shader.getUniformLocationByName('_PROJECTION'),
            rendererParams.materialPropertyBlock.getMatrix('_PROJECTION')
        );

        this.context.uniformMatrix(
            rendererParams.material.shader.getUniformLocationByName('_MODEL_MATRIX'),
            rendererParams.materialPropertyBlock.getMatrix('_MODEL_MATRIX')
        );

        indexBuffer.bind();

        this.context.drawElements(topology, indexBuffer.count, indexBuffer.type, startIndex);
    }
}
