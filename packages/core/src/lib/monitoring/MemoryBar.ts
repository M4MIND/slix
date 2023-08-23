import { MemoryServer } from 'memory';

export default class MemoryBar {
    private title: HTMLSpanElement = document.createElement('span');
    private wrapper: HTMLDivElement = document.createElement('div');
    private HtmlBar: HTMLProgressElement = document.createElement('progress');
    constructor(public readonly name: string, rootWrapper: HTMLDivElement) {
        this.HtmlBar.value = 0;
        this.HtmlBar.max = MemoryServer.getAllocator(name).byteSize;
        this.HtmlBar.style.width = '100%';

        this.title.innerText = this.name;
        this.title.style.fontSize = '12px';

        this.wrapper.style.display = 'flex';
        this.wrapper.style.flexDirection = 'column';
        this.wrapper.appendChild(this.title);
        this.wrapper.appendChild(this.HtmlBar);

        rootWrapper.appendChild(this.wrapper);
    }

    update() {
        this.title.innerText = `${this.name} ${MemoryServer.getAllocator(this.name).numAllocations}`;
        this.HtmlBar.value = MemoryServer.getAllocator(this.name).usedMemory;
    }
}
