import { RendererServer } from '../../index';
import WebGL2ContextManager from '../manager/WebGL2ContextManager';

export default class Program {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;

    constructor(public readonly program: WebGLProgram) {}

    public link() {
        this.context.linkProgram(this.program);

        return this;
    }

    public use() {
        this.context.useProgram(this.program);
    }
}
