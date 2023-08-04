import { GL_PROGRAM_PARAMETERS, RendererServer } from '../../index';
import WebGL2ContextManager from '../manager/WebGL2ContextManager';
import { GL_LINK_STATUS } from '../webgl.consts';

export default class Program {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;

    constructor(public readonly program: WebGLProgram) {}

    getActiveAttributes() {
        return this.context.getProgramParameter(this.program, GL_PROGRAM_PARAMETERS.ACTIVE_ATTRIBUTES);
    }

    getActiveAttribute(index: number) {
        return this.context.getActiveAttrib(this.program, index);
    }
    getAttributeLocation(name: string) {
        return this.context.getAttribLocation(this.program, name);
    }
    getActiveUniforms() {
        return this.context.getProgramParameter(this.program, GL_PROGRAM_PARAMETERS.ACTIVE_UNIFORMS);
    }

    getActiveUniform(index: number) {
        return this.context.getActiveUniform(this.program, index);
    }

    getUniformLocation(name: string) {
        return this.context.getUniformLocation(this.program, name);
    }

    attachShader(vertex: WebGLShader, fragment: WebGLShader) {
        this.context.attachShader(this.program, vertex);
        this.context.attachShader(this.program, fragment);

        return this;
    }

    enableVertexAttribute(index: number) {
        this.context.enableVertexAttribArray(index);
    }

    link() {
        this.context.linkProgram(this.program);

        if (this.context.getProgramParameterLink(this.program)) return this;

        throw new Error(`Could not compile WebGL program`);
    }

    use() {
        this.context.useProgram(this.program);
    }
}
