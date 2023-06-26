import Shader from './Shader';
import WebGL2ContextManager from './manager/WebGL2ContextManager';

export default class GpuProgram {
    public static contextManager: WebGL2ContextManager;
    
    constructor(public readonly program: WebGLProgram) {}

    public attachShader(shader: Shader) {
        GpuProgram.contextManager.attachShader(this, shader);

        return this;
    }

    public link() {
        GpuProgram.contextManager.linkProgram(this);

        return this;
    }

    public use() {
        GpuProgram.contextManager.useProgram(this);

        return this;
    }

    public getAttribLocation(attrib: string) {
        return GpuProgram.contextManager.getAttribLocation(this, attrib);
    }

    public static attachShader(program: GpuProgram, shader: Shader) {
        this.contextManager.attachShader(program, shader);

        return this;
    }

    public static getAttribLocation(gpuProgram: GpuProgram, attrib: string) {
        return this.contextManager.getAttribLocation(
            gpuProgram,
            attrib
        );
    }

    public static use(gpuProgram: GpuProgram) {
        this.contextManager.useProgram(gpuProgram);

        return this;
    }

    public static linkProgram(gpuProgram: GpuProgram) {
        this.contextManager.linkProgram(gpuProgram);

        return this;
    }

    public static create(): GpuProgram {
        return this.contextManager.createProgram();
    }
}
