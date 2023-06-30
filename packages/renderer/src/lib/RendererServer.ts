import CanvasManager from './manager/CanvasManager';
import GpuProgramManager from './manager/GpuProgramManager';
import RendererManager from './manager/RendererManager';
import ShaderManager from './manager/ShaderManager';
import WebGL2Context from './manager/WebGL2ContextManager';
import {LinearAllocation, PoolAllocator} from 'memory';
import BufferManager from "./manager/BufferManager";

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
    public static gpuProgramManager: GpuProgramManager;
    public static rendererManager: RendererManager;
    public static shaderManager: ShaderManager;
    //private static linearAllocator: LinearAllocation;
    //private static poolAllocator: PoolAllocator;
    private static bufferManager: BufferManager;

    private constructor() {}

    public static startUp(configs: initConfigs) {
        //this.linearAllocator = new LinearAllocation(64);
        //this.poolAllocator = new PoolAllocator(64, 1024, 4);
        this.bufferManager = new BufferManager();
        this.canvasManager = new CanvasManager(configs.canvas, configs.width, configs.height);
        this.contextManager = new WebGL2Context(configs.width, configs.height);
        this.shaderManager = new ShaderManager();
        this.gpuProgramManager = new GpuProgramManager();
        this.rendererManager = new RendererManager();

        return this;
    }

    public static test() {
        // const array = this.memoryServer.linearAllocation.allocate(4, Int8Array);
        // const array2 = this.memoryServer.linearAllocation.allocate(4, Float32Array);
        // const array3 = this.memoryServer.linearAllocation.allocate(4, Float32Array);
        //
        // array[0] = 24;
        // array2[1] = 32;
        // array3[0] = 64;
        //
        // setTimeout(() => {
        //     console.log(array, array2, array3, this.memoryServer.linearAllocation.buffer[0]);
        // }, 1000)

        // array = this.memoryServer.linearAllocation.allocate(2, Float32Array);
        // array2 = this.memoryServer.linearAllocation.allocate(4, Float32Array)
        //
        // array[1] = 24;
        // array2[4] = 0;
        //
        // console.log(array, array2, this.memoryServer.linearAllocation);

        // this.memoryServer.linearAllocation.clear();
        //
        // array = this.memoryServer.linearAllocation.allocate(3, Int8Array);
        // array2 = this.memoryServer.linearAllocation.allocate(12, Int8Array);
        //
        // array[0] = 56
        // array2[2] = 24;
        //
        //
        // console.log(array, array2, this.memoryServer.linearAllocation)

        // const shader = this.shaderManager.createShader('shader/test', vertex, fragmnet);
        // const program = this.gpuProgramManager.createProgram(shader);
        // const baseMesh = new BaseMesh();
        //
        // const ar = new Float64Array([16]);
        //
        // console.log(ar.byteLength);
        //
        // const address = this.memory.allocate(ar.byteLength);
        // this.memory.write(address, new Float32Array([16, 13, 12, 345, 3456345, 34543]));
        // console.dir(new Float32Array(this.memory.read(address)));
        //
        // program.use();
        //
        // const buffer = this.contextManager.createBuffer();
        // this.contextManager.bindBuffer(GL_ARRAY_BUFFER, buffer);
        // this.contextManager.bufferData(GL_ARRAY_BUFFER, new Float32Array([0, 0, 0, 0.5, 0.7, 0]), GL_STATIC_DRAW);
    }
}
