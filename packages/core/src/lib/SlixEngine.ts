import Renderer from './Renderer';
import SceneManager from './scene/SceneManager';
import { MATH_ALLOCATOR } from 'mathf';
import { FreeListAllocator, LinearAllocator, MemoryServer } from 'memory';
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
                allocator: FreeListAllocator,
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
                    allocator: FreeListAllocator,
                },
                {
                    name: MATH_ALLOCATOR.PERSISTENT,
                    byteSize: 16 * 1024 * 1024,
                    allocator: FreeListAllocator,
                },
                {
                    name: MATH_ALLOCATOR.PERSISTENT_TEMP,
                    byteSize: 16 * 1024 * 1024,
                    allocator: FreeListAllocator,
                },
            ],
        });
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
        // Rendering
        for (const gm of SlixEngine.sceneManager.getActiveScene().root) {
        }

        window.requestAnimationFrame(SlixEngine.loop);
    }
}
