import MaterialManager from './gpu/MaterialManager';
import BufferManager from './manager/BufferManager';
import CanvasManager from './manager/CanvasManager';
import GpuManager from './manager/GpuManager';
import MeshManager from './manager/MeshManager';
import RendererManager from './manager/RendererManager';
import ShaderManager from './manager/ShaderManager';
import WebGL2Context from './manager/WebGL2ContextManager';
import { Vector3 } from 'mathf';
import { MemoryServer, NativeArray, NativeStaticArray, TypedArrayKeys } from 'memory';

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
    public static rendererManager: RendererManager;
    public static shaderManager: ShaderManager;
    private static bufferManager: BufferManager;
    private static materialManager: MaterialManager;
    private static meshManager: MeshManager;
    private static memory: MemoryServer;

    private constructor() {}

    public static startUp(configs: initConfigs) {
        this.memory = MemoryServer.startUp();
        this.canvasManager = new CanvasManager(configs.canvas, configs.width, configs.height);
        this.contextManager = new WebGL2Context(configs.width, configs.height);
        this.bufferManager = new BufferManager();
        this.gpuProgramManager = new GpuManager();
        this.shaderManager = new ShaderManager();
        this.materialManager = new MaterialManager();
        this.meshManager = new MeshManager();
        this.rendererManager = new RendererManager();

        const nativeArray = new NativeStaticArray({
            position: { wordSize: TypedArrayKeys.Int32Array, length: 6 },
            camera: { wordSize: TypedArrayKeys.Int32Array, length: 16 },
            indices: { wordSize: TypedArrayKeys.Int32Array, length: 4 },
        });

        const nativeArray2 = new NativeStaticArray({
            position: { wordSize: TypedArrayKeys.Int32Array, length: 6 },
            camera: { wordSize: TypedArrayKeys.Int32Array, length: 16 },
            indices: { wordSize: TypedArrayKeys.Int32Array, length: 4 },
        });

        nativeArray.setDataByStructureName('position', [new Vector3(-1, -2, -3), new Vector3(-4, -5, -6)].flat());
        nativeArray.setDataByStructureName(
            'camera',
            [11, 12, 13, 14, 15, 16, 17, 18, 19, 110, 111, 112, 113, 114, 115, 116]
        );
        nativeArray.setDataByStructureName('indices', [210, 211, 212, 213]);

        nativeArray2.setDataByStructureName('position', [new Vector3(-1, -2, -3), new Vector3(-4, -5, -6)].flat());
        nativeArray2.setDataByStructureName(
            'camera',
            [11, 12, 13, 14, 15, 16, 17, 18, 19, 110, 111, 112, 113, 114, 115, 116]
        );
        nativeArray2.setDataByStructureName('indices', [210, 211, 212, 213]);

        console.log(MemoryServer.LinearAllocation.arrayBuffer);

        return this;
    }

    public static test() {}
}
