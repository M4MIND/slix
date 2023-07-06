import RendererServer from '../RendererServer';
import Program from '../gpu/Program';
import WebGL2ContextManager from './WebGL2ContextManager';

export default class GpuManager {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;
    private readonly programList: { [index: string]: Program } = {};

    constructor() {}

    public createProgram() {}
}
