import { RendererServer } from '../../index';
import WebGL2ContextManager from '../manager/WebGL2ContextManager';
import Shader from '../shader/Shader';
import UniformBaseDescriptor from "../uniform/UniformBaseDescriptor";
import AttrBaseDescriptor from "../uniform/AttrBaseDescriptor";

export default class GpuProgram {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;

    constructor(
        public readonly program: WebGLProgram,
        public readonly shader: Shader,
        public readonly attrib: { [index: string]: AttrBaseDescriptor },
        public readonly uniforms: { [index: string]: UniformBaseDescriptor },
    ) {}

    public link() {
        this.context.linkProgram(this.program);

        return this;
    }

    public use() {
        this.context.useProgram(this.program);
    }
}
