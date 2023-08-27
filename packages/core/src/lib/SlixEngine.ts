import { Cube } from '../index';
import { GameObject, MeshFilterComponent, MeshRendererComponent, Monkey } from '../index';
import Renderer from './Renderer';
import MemoryMonitor from './monitoring/MemoryMonitor';
import SceneManager from './scene/SceneManager';
import { MATH_ALLOCATOR } from 'mathf';
import {
    BoundaryTagAllocator,
    Float32NativeArray,
    LinearAllocator,
    MemoryCalculate,
    MemoryServer,
    PoolAllocator,
} from 'memory';
import { RendererServer, RendererServerInitConfigs } from 'renderer';

export enum ALLOCATORS {
    LINEAR = '_LINEAR',
    LINEAR_TEMP = '_LINEAR_TEMP',
    FREE_LIST = '_FREE_LIST',
}

export default class SlixEngine {
    private static init = false;
    public static sceneManager: SceneManager;

    static startUp(configs: { rendererServer: RendererServerInitConfigs }) {
        if (this.init) {
            return;
        }

        MemoryServer.startUp({
            name: '_ROOT',
            root: LinearAllocator,
            default: {
                byteSize: 32 * 1024 * 1024,
                allocator: BoundaryTagAllocator,
            },
            children: [
                {
                    name: ALLOCATORS.LINEAR,
                    byteSize: 32 * 1024 * 1024,
                    allocator: LinearAllocator,
                },
                {
                    name: ALLOCATORS.LINEAR_TEMP,
                    byteSize: 16 * 1024 * 1024,
                    allocator: LinearAllocator,
                },
                {
                    name: ALLOCATORS.FREE_LIST,
                    byteSize: 64 * 1024 * 1024,
                    allocator: BoundaryTagAllocator,
                },
                {
                    name: MATH_ALLOCATOR.PERSISTENT,
                    byteSize: MemoryCalculate.MB(6),
                    allocator: PoolAllocator,
                    params: [76, 4],
                },
                {
                    name: MATH_ALLOCATOR.PERSISTENT_CACHE,
                    byteSize: MemoryCalculate.MB(2),
                    allocator: PoolAllocator,
                    params: [76, 4],
                },
            ],
        });

        MemoryMonitor.startUp();
        RendererServer.startUp(configs.rendererServer);
        Renderer.startUp();

        this.sceneManager = new SceneManager();

        this.init = true;

        return this;
    }

    static start(prepare: (sceneManager: SceneManager) => void) {
        prepare(SlixEngine.sceneManager);
        SlixEngine.loop();
    }

    private static loop() {
        for (const gm of SlixEngine.sceneManager.getActiveScene().root) {
        }

        MemoryMonitor.draw();

        window.requestAnimationFrame(SlixEngine.loop);
    }
}
