import RendererServer from '../RendererServer';
import { MESH_TOPOLOGY } from '../mesh.enums';
import RendererParams from '../renderer/RendererParams';
import WebGL2ContextManager from './WebGL2ContextManager';

export default class GraphicsManager {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;
    constructor() {
        //
    }

    public rendererPrimitivesIndexed(rendererParams: RendererParams, topology: MESH_TOPOLOGY) {
        //
    }
}
