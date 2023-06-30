import RendererServer from '../RendererServer';
import { GL_SHADER_TYPES } from '../webgl.consts';
import Shader from '../shader/Shader';
import WebGL2ContextManager from './WebGL2ContextManager';

export default class ShaderManager {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;

    constructor() {}

    public createShader(name: string, vertex: string, fragment: string): Shader {
        const [vertexShader, fragmentShader] = [
            this.context.createShader(GL_SHADER_TYPES.vertex),
            this.context.createShader(GL_SHADER_TYPES.fragment),
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

        return new Shader(name, vertexShader, fragmentShader);
    }
}
