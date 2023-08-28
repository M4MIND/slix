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
                    name: MATH_ALLOCATOR.PERSISTENT_VECTOR,
                    byteSize: MemoryCalculate.MB(64),
                    allocator: PoolAllocator,
                    params: [16, 4],
                },
                {
                    name: MATH_ALLOCATOR.PERSISTENT_MATRIX,
                    byteSize: MemoryCalculate.MB(1),
                    allocator: PoolAllocator,
                    params: [64, 4],
                },
                {
                    name: MATH_ALLOCATOR.PERSISTENT_MATRIX_CACHE,
                    byteSize: MemoryCalculate.MB(1),
                    allocator: PoolAllocator,
                    params: [72, 4],
                },
                {
                    name: MATH_ALLOCATOR.PERSISTENT_QUATERNION_CACHE,
                    byteSize: MemoryCalculate.MB(1),
                    allocator: PoolAllocator,
                    params: [36, 4],
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
