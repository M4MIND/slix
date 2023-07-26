import {
    GL_BUFFER_TARGET,
    GL_PROGRAM_PARAMETERS,
    GL_SHADER_STATUSES,
    GL_SHADER_TYPES,
    GL_USAGE_BUFFER,
    RendererServer,
} from '../../index';
import { GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT, GL_DEPTH_TEST, GL_LEQUAL } from '../webgl.consts';

export default class WebGL2ContextManager {
    private context: WebGL2RenderingContext;

    constructor(width: number, height: number) {
        this.context = RendererServer.canvasManager.canvas.getContext('webgl2') as WebGL2RenderingContext;
        this.viewport(width, height);
        this.clearColor();
        this.enable();
        this.depthFunc();
    }

    public createProgram(): WebGLProgram {
        const program = this.context.createProgram();

        if (program) {
            return program;
        }

        throw new Error(`Can't create GPU program`);
    }

    public createShader(type: GL_SHADER_TYPES): WebGLShader {
        const shader = this.context.createShader(type);

        if (shader) {
            return shader;
        }

        throw new Error(`Can't create Shader: ${GL_SHADER_TYPES[type]}`);
    }

    public shaderSource(shader: WebGLShader, source: string) {
        this.context.shaderSource(shader, source);

        return this;
    }

    public attachShader(program: WebGLProgram, shader: WebGLShader) {
        this.context.attachShader(program, shader);

        return this;
    }

    public getAttribLocation(program: WebGLProgram, name: string): number {
        return this.context.getAttribLocation(program, name);
    }

    public getProgramParameter(program: WebGLProgram, type: GL_PROGRAM_PARAMETERS): number[] {
        return [...new Array(this.context.getProgramParameter(program, type)).keys()];
    }

    public getActiveAttrib(program: WebGLProgram, index: number): WebGLActiveInfo | null {
        return this.context.getActiveAttrib(program, index);
    }

    public getActiveUniform(program: WebGLProgram, index: number): WebGLActiveInfo | null {
        return this.context.getActiveUniform(program, index);
    }

    public compileShader(shader: WebGLShader) {
        this.context.compileShader(shader);
    }

    public linkProgram(program: WebGLProgram) {
        this.context.linkProgram(program);
    }

    public useProgram(program: WebGLProgram) {
        this.context.useProgram(program);
    }

    public getShaderParameter(shader: WebGLShader, type: GL_SHADER_STATUSES) {
        return this.context.getShaderParameter(shader, type);
    }

    public getShaderCompileStatus(shader: WebGLShader) {
        return this.getShaderParameter(shader, GL_SHADER_STATUSES.compile);
    }

    public getShaderInfoLog(shader: WebGLShader) {
        return this.context.getShaderInfoLog(shader);
    }

    public createWebGLBuffer() {
        const buffer = this.context.createBuffer();

        if (buffer) {
            return buffer;
        }

        throw new Error(`Can't create WebGLBuffer`);
    }

    public deleteWebGLBuffer(a: WebGLBuffer) {
        this.context.deleteBuffer(a);
    }

    public bufferData(
        target: GL_BUFFER_TARGET,
        src: ArrayBufferView,
        usage: GL_USAGE_BUFFER,
        srcOffset = 0,
        length = 0
    ) {
        this.context.bufferData(target, src, usage, srcOffset, length);

        return this;
    }

    public bufferSubData(
        target: GL_BUFFER_TARGET,
        dstByteOffset: number,
        srcData: ArrayBufferView,
        srcOffset = 0,
        length = 0
    ) {
        this.context.bufferSubData(target, dstByteOffset, srcData, srcOffset, length);
    }

    public bindBuffer(type: number, buffer: WebGLBuffer) {
        this.context.bindBuffer(type, buffer);
    }

    public clearColor() {
        this.context.clearColor(1.0, 0.0, 0.0, 1);
    }

    public enable() {
        this.context.enable(GL_DEPTH_TEST);
    }

    public depthFunc() {
        this.context.depthFunc(GL_LEQUAL);
    }

    public clear() {
        this.context.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    }

    public viewport(x: number, y: number) {
        this.context.viewport(0, 0, x, y);

        return this;
    }

    public bindVertexArray(a: WebGLVertexArrayObject) {
        this.context.bindVertexArray(a);

        return this;
    }

    public unbindVertexArray() {
        this.context.bindVertexArray(null);

        return this;
    }

    public deleteVertexArray(a: WebGLVertexArrayObject) {
        this.context.deleteVertexArray(a);

        return this;
    }
}
