import RendererServer from '../RendererServer';
import { GL_PROGRAM_PARAMETERS } from '../webgl.consts';
import GpuProgram from '../program/GpuProgram';
import Shader from '../shader/Shader';
import AttrBaseDescriptor from '../uniform/AttrBaseDescriptor';
import UniformBaseDescriptor from '../uniform/UniformBaseDescriptor';
import WebGL2ContextManager from './WebGL2ContextManager';

export default class GpuProgramManager {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;
    private readonly programList: { [index: string]: GpuProgram } = {};

    constructor() {}

    public createProgram(shader: Shader) {
        if (this.programList[shader.name]) {
            throw new Error(`Can't create ${GpuProgram.name}: Program ${shader.name} is exist`);
        }

        const webGlProgram = this.context.createProgram();

        this.context
            .attachShader(webGlProgram, shader.vertex)
            .attachShader(webGlProgram, shader.fragment)
            .linkProgram(webGlProgram);

        const attribIndices = this.context.getProgramParameter(webGlProgram, GL_PROGRAM_PARAMETERS.active_attrib);
        const uniformIndices = this.context.getProgramParameter(webGlProgram, GL_PROGRAM_PARAMETERS.active_uniforms);

        const attrib: { [index: string]: AttrBaseDescriptor } = {};
        const uniform: { [index: string]: UniformBaseDescriptor } = {};

        for (const i of attribIndices) {
            const attr = this.context.getActiveAttrib(webGlProgram, i);
            if (!attr) {
                continue;
            }

            attrib[attr.name] = new AttrBaseDescriptor(i, attr.name, attr.type, attr.size);
        }

        for (const i of uniformIndices) {
            const uniformActive = this.context.getActiveUniform(webGlProgram, i);

            if (!uniformActive) {
                continue;
            }

            uniform[uniformActive.name] = new UniformBaseDescriptor(
                i,
                uniformActive.name,
                uniformActive.type,
                uniformActive.size
            );
        }

        const gpuProgram = new GpuProgram(webGlProgram, shader, attrib, uniform);

        this.programList[shader.name] = gpuProgram;

        return gpuProgram;
    }
}
