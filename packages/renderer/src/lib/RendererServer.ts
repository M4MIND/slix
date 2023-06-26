import { GL_BUFFERS, GL_USAGE_BUFFER } from './consts';

import CanvasManager from './manager/CanvasManager';
import GPUProgramManager from './manager/GPUProgramManager';
import GpuBuffer from './buffer/GpuBuffer';
import GpuProgram from './GpuProgram';
import RendererManager from './manager/RendererManager';
import Shader from './Shader';
import WebGL2Context from './manager/WebGL2ContextManager';

type initConfigs = { canvas: HTMLCanvasElement; width: number; height: number };

const vertex = `

// an attribute will receive data from a buffer
attribute vec4 a_position;
attribute vec4 b_position;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`;

const fragmnet = `
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

void main() {
  // gl_FragColor is a special variable a fragment shader
  // is responsible for setting
  gl_FragColor = vec4(1, 0, 0.5, 1); // return redish-purple
}
`;

export default class RendererServer {
    private static rendererServer: RendererServer;

    public readonly canvasManager: CanvasManager;
    public readonly contextManager: WebGL2Context;
    public readonly gpuProgramManager: GPUProgramManager;
    public readonly rendererManager: RendererManager;

    private constructor(configs: initConfigs) {
        this.canvasManager = new CanvasManager(
            configs.canvas,
            configs.width,
            configs.height
        );
        this.contextManager = new WebGL2Context(
            configs.canvas,
            configs.width,
            configs.height
        );
        this.rendererManager = new RendererManager();
        this.gpuProgramManager = new GPUProgramManager();

        GpuProgram.contextManager = this.contextManager;
        Shader.contextManager = this.contextManager;
    }

    public static init(configs: initConfigs) {
        if (!this.rendererServer) {
            this.rendererServer = new RendererServer(configs);
        }

        return this;
    }

    public static getInstance() {
        if (!this.rendererServer) {
            throw new Error(
                'Renderer server is not init. Please create new instance - RendererServer.init()'
            );
        }
        return this.rendererServer;
    }

    public static getCanvasManager() {
        return this.rendererServer.canvasManager;
    }

    public static getContextManager() {
        return this.rendererServer.contextManager;
    }

    public static getRendererManager() {
        return this.rendererServer.rendererManager;
    }

    public static getGpuProgramManager() {
        return this.rendererServer.gpuProgramManager;
    }

    public static test() {
        const program = GpuProgram.create();
        const vertexShader = Shader.createVertex();
        const fragmentShader = Shader.createFragmnet();

        vertexShader.compile(vertex);
        fragmentShader.compile(fragmnet);

        program
            .attachShader(vertexShader)
            .attachShader(fragmentShader)
            .link()
            .use();

        console.log(program, vertexShader, fragmentShader);

        console.dir(program.getAttribLocation('a_position'));
    }
}
