import MaterialManager from './gpu/MaterialManager';
import BufferManager from './manager/BufferManager';
import CanvasManager from './manager/CanvasManager';
import GpuManager from './manager/GpuManager';
import GraphicsManager from './manager/GraphicsManager';
import MeshManager from './manager/MeshManager';
import ShaderManager from './manager/ShaderManager';
import WebGL2Context from './manager/WebGL2ContextManager';

type initConfigs = { canvas: HTMLCanvasElement; width: number; height: number };

const vertex = `#version 300 es
precision highp float;

in vec4 a_position;

void main() {
    gl_Position = a_position * vec4(1,1,1,1);
}
`;

const fragmnet = `#version 300 es

precision highp float;

out vec4 outColor;

void main() {
    outColor = vec4(1, 0, 0.5, 1);
}
`;

export default class RendererServer {
    public static canvasManager: CanvasManager;
    public static contextManager: WebGL2Context;
    public static gpuProgramManager: GpuManager;
    public static graphicsManager: GraphicsManager;
    public static shaderManager: ShaderManager;
    public static materialManager: MaterialManager;
    public static meshManager: MeshManager;
    public static bufferManager: BufferManager;

    private constructor() {}
    public static startUp(configs: initConfigs) {
        this.canvasManager = new CanvasManager(configs.canvas, configs.width, configs.height);
        this.contextManager = new WebGL2Context(configs.width, configs.height);
        this.bufferManager = new BufferManager();
        this.gpuProgramManager = new GpuManager();
        this.shaderManager = new ShaderManager();
        this.materialManager = new MaterialManager();
        this.meshManager = new MeshManager();
        this.graphicsManager = new GraphicsManager();

        return this;
    }
}
