import { GraphicsBuffer } from '../../index';
import { BaseMaterial, BaseMesh } from '../../index';
import { RendererServer } from '../RendererServer';
import { MESH_TOPOLOGY } from '../mesh.enums';
import RendererParams from '../renderer/RendererParams';
import { GL_DEPTH_TEST } from '../webgl.consts';
import WebGL2ContextManager from './WebGL2ContextManager';
import { Color, Matrix4, Vector3 } from 'mathf';

export default class GraphicsManager {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;
    private position = new Vector3(0, 0, -6);
    private projection = Matrix4.projection((70 * Math.PI) / 180, RendererServer.canvasManager.aspect);
    private color = new Color(0, 0, 0, 1);
    private modelMatrix = new Matrix4().translate(this.position);
    private rotateY = 0;
    constructor() {
        //
    }
    drawElementsInstanced(
        rendererParams: RendererParams,
        topology: MESH_TOPOLOGY,
        indexBuffer: GraphicsBuffer,
        indexCount: number,
        startIndex = 0,
        instanceCount: number
    ) {}

    renderMesh(mesh: BaseMesh, material: BaseMaterial) {
        this.modelMatrix.clear();
        material.shader.use();
        mesh.vertexBuffer.bind();

        for (const descriptor of mesh.getVertexBufferParams()) {
            const attribute = material.shader.getPropertyAttribute(descriptor.attribute);

            this.context.vertexAttributePointer(
                attribute.index,
                descriptor.dimension,
                descriptor.byteSize,
                false,
                mesh.byteSizeOfOneVertexPack,
                descriptor.offset
            );
        }

        mesh.indexBuffer.bind();

        this.context.uniformMatrix(material.shader.getUniformLocationByName('_U_PROJECTION'), this.projection);

        this.context.uniformMatrix(
            material.shader.getUniformLocationByName('_U_MODEL'),
            this.modelMatrix.translate(this.position)
        );

        this.context.uniformVector(material.shader.getUniformLocationByName('_U_COLOR'), this.color);

        this.context.drawElements(mesh.topology, mesh.indexBuffer.count, mesh.indexBuffer.type, 0);
    }

    drawElements(
        rendererParams: RendererParams,
        topology: MESH_TOPOLOGY,
        indexBuffer: GraphicsBuffer,
        indexCount: number,
        startIndex = 0
    ) {
        this.context.clearColor(1, 1, 1, 1);
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
            rendererParams.material.shader.getUniformLocationByName('_VIEW'),
            rendererParams.materialPropertyBlock.getMatrix('_VIEW')
        );

        this.context.uniformMatrix(
            rendererParams.material.shader.getUniformLocationByName('_MODEL'),
            rendererParams.materialPropertyBlock.getMatrix('_MODEL')
        );

        indexBuffer.bind();

        this.context.drawElements(topology, indexBuffer.count, indexBuffer.type, startIndex);
    }
}
