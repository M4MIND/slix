import { TransformComponent } from '../index';
import Renderer from './Renderer';
import SceneManager from './scene/SceneManager';
import { MemoryServer, MemoryServerInitConfigs } from 'memory';
import { RendererServer, RendererServerInitConfigs } from 'renderer';

export default class SlixEngine {
    private static init = false;
    public static sceneManager: SceneManager;

    static startUp(configs: { memoryServer: MemoryServerInitConfigs; rendererServer: RendererServerInitConfigs }) {
        if (this.init) {
            return;
        }

        MemoryServer.startUp(configs.memoryServer);
        RendererServer.startUp(configs.rendererServer);
        Renderer.startUp();

        this.sceneManager = new SceneManager();

        this.init = true;

        return this;
    }

    static start(prepare: (sceneManager: SceneManager) => void) {
        prepare(SlixEngine.sceneManager);
        SlixEngine.gameLoop();
    }

    private static gameLoop() {
        SlixEngine.sceneManager
            .getActiveScene()
            .sceneGameObject.getComponentsInChildren<TransformComponent>(TransformComponent);

        window.requestAnimationFrame(SlixEngine.gameLoop);
    }
}
