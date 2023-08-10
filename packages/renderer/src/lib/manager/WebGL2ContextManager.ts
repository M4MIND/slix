import {
    GL_BUFFER_TARGET,
    GL_PROGRAM_PARAMETERS,
    GL_SHADER_STATUSES,
    GL_SHADER_TYPES,
    GL_USAGE_BUFFER,
    MESH_TOPOLOGY,
    RendererServer,
} from '../../index';
import {
    GL_COLOR_BUFFER_BIT,
    GL_CULL_FACE,
    GL_DATA_UNSIGNED_INT,
    GL_DEPTH_BUFFER_BIT,
    GL_DEPTH_TEST,
    GL_LEQUAL,
    GL_LINK_STATUS,
    GL_SAMPLE_COVERAGE,
} from '../webgl.consts';
import { GL_BUFFER_PARAMS, GL_PARAMETERS, GL_VERTEX_ATTRIBUTE_FORMAT } from '../webgl.enums';
import { Color, Matrix4, Vector4 } from 'mathf';

export default class WebGL2ContextManager {
    private context: WebGL2RenderingContext;

    constructor(width: number, height: number) {
        this.context = RendererServer.canvasManager.canvas.getContext('webgl2') as WebGL2RenderingContext;

        this.viewport(width, height);
        this.enable(GL_CULL_FACE);
        this.enable(GL_DEPTH_TEST);
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

    public getProgramParameterLink(program: WebGLProgram) {
        return this.context.getProgramParameter(program, GL_LINK_STATUS);
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

    public unbindBuffer(type: number) {
        this.context.bindBuffer(type, null);
    }

    public clearColor(r: number, g: number, b: number, a: number) {
        this.context.clearColor(r, g, b, a);
    }

    public enable(param: number) {
        this.context.enable(param);
    }

    public depthFunc(param: number = GL_LEQUAL) {
        this.context.depthFunc(param);
    }

    public clear(param: number = GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT) {
        this.context.clear(param);
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

    public getBufferParameter(target: GL_BUFFER_TARGET, param: GL_BUFFER_PARAMS | GL_BUFFER_TARGET) {
        return this.context.getBufferParameter(target, param);
    }

    public getBufferSubData(
        target: GL_BUFFER_TARGET,
        srcByteOffset = 0,
        dstData: ArrayBufferView,
        dstOffset = 0,
        length = 0
    ) {
        this.context.getBufferSubData(target, srcByteOffset, dstData, dstOffset, length);
    }

    public getParameter(param: GL_PARAMETERS) {
        return this.context.getParameter(param);
    }

    public drawElements(mode: MESH_TOPOLOGY, count: number, type: number, offset: number) {
        this.context.drawElements(mode, count, type, offset);
    }

    public drawElementsInstanced(
        mode: MESH_TOPOLOGY,
        count: number,
        type: number,
        offset: number,
        instanceCount: number
    ) {
        this.context.drawElementsInstanced(mode, count, type, offset, instanceCount);
    }

    public getUniformLocation(program: WebGLProgram, name: string) {
        return this.context.getUniformLocation(program, name);
    }

    public vertexAttributePointer(
        index: number,
        size: number,
        type: GL_VERTEX_ATTRIBUTE_FORMAT,
        normalize = false,
        stride = 0,
        offset = 0
    ) {
        this.context.vertexAttribPointer(index, size, type, normalize, stride, offset);
    }

    public enableVertexAttribArray(index: number) {
        this.context.enableVertexAttribArray(index);
    }

    public uniformMatrix(location: WebGLUniformLocation, data: number[] | Matrix4, transpose = false) {
        this.context.uniformMatrix4fv(location, transpose, data);
    }

    public uniformVector(location: WebGLUniformLocation, data: Vector4 | Color) {
        this.context.uniform4fv(location, data);
    }
}
