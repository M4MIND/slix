import { RendererServer } from '../RendererServer';
import Program from '../gpu/Program';
import WebGL2ContextManager from './WebGL2ContextManager';

export default class GpuManager {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;

    constructor() {
        ///
    }

    public createProgram(vertex: WebGLShader, fragment: WebGLShader) {
        const program = new Program(this.context.createProgram());

        program.attachShader(vertex, fragment);

        program.link();

        return program;
    }
}
