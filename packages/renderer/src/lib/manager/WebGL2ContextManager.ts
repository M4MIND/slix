import {
    GL_ACTIVE_ATTRIBUTES,
    GL_BUFFERS,
    GL_BUFFERS_USAGE,
    GL_COLOR_BUFFER_BIT,
    GL_COMPILE_STATUS,
    GL_DEPTH_BUFFER_BIT,
    GL_DEPTH_TEST,
    GL_FRAGMENT_SHADER,
    GL_LEQUAL,
    GL_LINK_STATUS,
    GL_TRIANGLES,
    GL_VERTEX_SHADER,
} from '../consts';

import GpuBuffer from '../buffer/GpuBuffer';
import GpuBufferBase from '../buffer/GpuBufferBase';
import GpuProgram from '../GpuProgram';
import Shader from '../Shader';

export default class WebGL2ContextManager {
    private context: WebGL2RenderingContext;
    constructor(
        private readonly canvas: HTMLCanvasElement,
        width: number,
        height: number
    ) {
        this.context = canvas.getContext('webgl2') as WebGL2RenderingContext;
        this.viewport(width, height);
        this.clearColor();
        this.enable();
        this.depthFunc();
    }

    public createProgram(): GpuProgram {
        const program = this.context.createProgram();

        if (!program) {
            throw new Error(`Can't create GPU program`);
        }

        return new GpuProgram(program);
    }

    public useProgram(program: GpuProgram): GpuProgram {
        this.context.useProgram(program.program);
        return program;
    }

    public linkProgram(program: GpuProgram) {
        this.context.linkProgram(program.program);

        if (!this.getProgramParameter(program)) {
            throw new Error(`Problem with Link program: ${this.context.getProgramInfoLog(program.program)}`,);
        }

        return program;
    }

    public getProgramParameter(program: GpuProgram) {
        return this.context.getProgramParameter(program.program, GL_LINK_STATUS);
    }

    public getAttribLocation(gpuProgram: GpuProgram, attrib: string) {
        this.context.getAttribLocation(gpuProgram.program, attrib);
    }

    public createVertexShader(): Shader {
        const shader = this.context.createShader(GL_VERTEX_SHADER);
        if (shader) {
            return new Shader(shader, this);
        }

        throw new Error(`Can't create shader Vertex shader`);
    }

    public createFragmnetShader(): Shader {
        const shader = this.context.createShader(GL_FRAGMENT_SHADER);

        if (shader) {
            return new Shader(shader, this);
        }

        throw new Error(`Can't create shader Fragment shader`);
    }

    public shaderSource(shader: Shader, source: string) {
        this.context.shaderSource(shader.shader, source);

        return shader;
    }

    public getShaderParameter(shader: Shader) {
        return this.context.getShaderParameter(
            shader.shader,
            GL_COMPILE_STATUS
        );
    }

    public attachShader(program: GpuProgram, shader: Shader) {
        this.context.attachShader(program.program, shader.shader);
    }

    public compileShader(shader: Shader) {
        this.context.compileShader(shader.shader);
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
    }

    public createBuffer(): GpuBuffer {
        const buffer = this.context.createBuffer();
        if (buffer) {
            return buffer;
        }

        throw new Error(`Can't create Buffer`);
    }

    public bindBuffer(buffer: GpuBufferBase) {
        this.context.bindBuffer(buffer.type, buffer);
    }

    public bufferData(buffer: GpuBufferBase) {
        this.context.bufferData(buffer.type, buffer.data, buffer.usage);
    }

    public draw() {
        this.context.drawArrays(GL_TRIANGLES, 0, 3)
    }

    public getShaderInfoLog(shader: Shader) {
        return this.context.getShaderInfoLog(shader.shader);
    }
}
