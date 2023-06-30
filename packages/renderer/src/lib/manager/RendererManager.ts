import RendererServer from "../RendererServer";
import WebGL2ContextManager from "./WebGL2ContextManager";

export default class RendererManager {
    private readonly context: WebGL2ContextManager = RendererServer.contextManager;
    constructor() {

    }
}