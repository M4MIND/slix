import MaterialManager from './gpu/MaterialManager';
import BufferManager from './manager/BufferManager';
import CanvasManager from './manager/CanvasManager';
import GpuManager from './manager/GpuManager';
import GraphicsManager from './manager/GraphicsManager';
import MeshManager from './manager/MeshManager';
import ShaderManager, { ShaderSource } from './manager/ShaderManager';
import WebGL2ContextManager from './manager/WebGL2ContextManager';
import WebGL2Context from './manager/WebGL2ContextManager';
import WebGLParamsManager from './manager/WebGLParamsManager';

export class RendererServer {
    private constructor() {}
    private static _canvasManager: CanvasManager;
    private static _contextManager: WebGL2Context;
    private static _gpuProgramManager: GpuManager;
    private static _graphicsManager: GraphicsManager;
    private static _shaderManager: ShaderManager;
    private static _materialManager: MaterialManager;
    private static _meshManager: MeshManager;
    private static _bufferManager: BufferManager;
    private static _webGLParamsManager: WebGLParamsManager;
    static get webGLParamsManager(): WebGLParamsManager {
        return this._webGLParamsManager;
    }
    static get bufferManager(): BufferManager {
        return this._bufferManager;
    }
    static get meshManager(): MeshManager {
        return this._meshManager;
    }
    static get materialManager(): MaterialManager {
        return this._materialManager;
    }
    static get shaderManager(): ShaderManager {
        return this._shaderManager;
    }
    static get graphicsManager(): GraphicsManager {
        return this._graphicsManager;
    }
    static get gpuProgramManager(): GpuManager {
        return this._gpuProgramManager;
    }
    static get contextManager(): WebGL2ContextManager {
        return this._contextManager;
    }
    static get canvasManager(): CanvasManager {
        return this._canvasManager;
    }

    public static startUp(configs: RendererServerInitConfigs) {
        this._canvasManager = new CanvasManager(configs.canvas.canvas, configs.canvas.width, configs.canvas.height);
        this._contextManager = new WebGL2Context(configs.canvas.width, configs.canvas.height);
        this._webGLParamsManager = new WebGLParamsManager();
        this._bufferManager = new BufferManager();
        this._gpuProgramManager = new GpuManager();
        this._shaderManager = new ShaderManager(configs.shaders);
        this._materialManager = new MaterialManager();
        this._meshManager = new MeshManager();
        this._graphicsManager = new GraphicsManager();

        return this;
    }
}

export type RendererServerInitConfigs = {
    canvas: {
        canvas: HTMLCanvasElement;
        width: number;
        height: number;
    };
    shaders: ShaderSource[];
};
