import { GL_PARAMETERS } from '../webgl.enums';
import { RendererServer } from './../RendererServer';
import WebGL2ContextManager from './WebGL2ContextManager';

export default class WebGLParamsManager {
    private readonly contextManager: WebGL2ContextManager = RendererServer.contextManager;
    private readonly params: { [k in GL_PARAMETERS]?: number } = {};

    getParameter(k: GL_PARAMETERS) {
        if (this.params[k]) return this.params[k];

        this.params[k] = this.contextManager.getParameter(k);
        return this.params[k];
    }
}
