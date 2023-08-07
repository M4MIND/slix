import { BaseShader } from '../../index';
import { RendererServer } from '../RendererServer';
import { GL_SHADER_TYPES } from '../webgl.enums';
import WebGL2ContextManager from './WebGL2ContextManager';

export type ShaderSource = {
    name: string;
    vertex: string;
    fragment: string;
};

export default class ShaderManager {
    private readonly gpuProgramManager = RendererServer.gpuProgramManager;
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;
    private readonly shaderCollection: { [key: string]: BaseShader } = {};

    constructor(shaders: ShaderSource[]) {
        for (const shader of shaders) {
            this.shaderCollection[shader.name] = this.compile(shader.name, shader.vertex, shader.fragment);
        }
    }

    public findShader(name: string) {
        return this.shaderCollection[name] ? this.shaderCollection[name] : null;
    }

    private compile(name: string, vertex: string, fragment: string): BaseShader {
        const [vertexShader, fragmentShader] = [
            this.context.createShader(GL_SHADER_TYPES.VERTEX),
            this.context.createShader(GL_SHADER_TYPES.FRAGMENT),
        ];

        this.context.shaderSource(vertexShader, vertex).compileShader(vertexShader);
        this.context.shaderSource(fragmentShader, fragment).compileShader(fragmentShader);

        const [vertexShaderCompileStatus, fragmentShaderCompileStatus] = [
            this.context.getShaderCompileStatus(vertexShader),
            this.context.getShaderCompileStatus(fragmentShader),
        ];

        if (!vertexShaderCompileStatus) {
            throw new Error(`Can't compile Vertex Shader: ${this.context.getShaderInfoLog(vertexShader)}`);
        }

        if (!fragmentShaderCompileStatus) {
            throw new Error(`Can't compile Fragment Shader: ${this.context.getShaderInfoLog(fragmentShader)}`);
        }

        const gpuProgram = this.gpuProgramManager.createProgram(vertexShader, fragmentShader);

        return new BaseShader(name, gpuProgram);
    }
}
