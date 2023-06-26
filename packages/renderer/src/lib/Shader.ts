import RendererServer from './RendererServer';
import WebGL2ContextManager from './manager/WebGL2ContextManager';

export default class Shader {
    public static contextManager: WebGL2ContextManager;

    constructor(
        public readonly shader: WebGLShader,
        private readonly context: WebGL2ContextManager
    ) {}

    public compile(source: string) {
        Shader.contextManager.shaderSource(this, source);
        Shader.contextManager.compileShader(this);

        if (!Shader.contextManager.getShaderParameter(this)) {
            throw new Error(`Can't compile shader`);
        }

        return this;
    }

    public getInfo() {
        return Shader.contextManager.getShaderInfoLog(this);
    }


    public static compile(shader: Shader, source: string) {
        this.contextManager.shaderSource(shader, source);
        this.contextManager.compileShader(shader);

        if (!Shader.contextManager.getShaderParameter(shader)) {
            throw new Error(`Can't compile shader`);
        }

        return this;
    }

    public static createVertex(): Shader {
        return Shader.contextManager.createVertexShader();
    }

    public static createFragmnet(): Shader {
        return Shader.contextManager.createFragmnetShader();
    }
}
