import MemoryBar from './MemoryBar';
import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import { MemoryServer } from 'memory';

export default class MemoryMonitor {
    private static title: HTMLSpanElement = document.createElement('span');
    private static wrapper = document.createElement('div');
    private static bars: MemoryBar[] = [];
    static startUp() {
        this.wrapper.style.position = 'fixed';
        this.wrapper.style.zIndex = '99999';
        this.wrapper.style.top = '8px';
        this.wrapper.style.left = '8px';
        this.wrapper.style.padding = '8px';
        this.wrapper.style.borderRadius = '4px';
        this.wrapper.style.display = 'flex';
        this.wrapper.style.flexDirection = 'column';
        this.wrapper.style.backgroundColor = 'rgba(0,0,0,.6)';

        this.title.style.marginBottom = '8px';
        this.title.innerText = 'MemoryServer';

        this.wrapper.appendChild(this.title);
        const allocators = MemoryServer.getAllocators();

        for (let i = 0; i < allocators.length; i++) {
            this.bars.push(new MemoryBar(allocators[i], this.wrapper));
        }

        document.body.appendChild(MemoryMonitor.wrapper);
    }

    static draw() {
        for (const i of this.bars) {
            i.update();
        }
    }
}
