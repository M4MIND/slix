import Renderer from './Renderer';
import { MemoryServer, MemoryServerInitConfigs } from 'memory';
import { RendererServer, RendererServerInitConfigs } from 'renderer';

export default class SlixEngine {
    private static init = false;

    static startUp(configs: { memoryServer: MemoryServerInitConfigs; rendererServer: RendererServerInitConfigs }) {
        if (this.init) {
            return;
        }

        MemoryServer.startUp(configs.memoryServer);
        RendererServer.startUp(configs.rendererServer);
        Renderer.startUp();

        this.init = true;
    }

    static start() {}
}
