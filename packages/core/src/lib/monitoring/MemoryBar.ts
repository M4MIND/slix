import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import { Allocator, MemoryServer } from 'memory';

export default class MemoryBar {
    private title: HTMLSpanElement = document.createElement('span');
    private wrapper: HTMLDivElement = document.createElement('div');
    private barWrapper: HTMLDivElement = document.createElement('div');
    private bar: HTMLDivElement = document.createElement('div');
    private _allocationTemp = 0;
    private _allocateMemoryTemp = 0;
    private _allocator: Allocator;
    constructor(public readonly name: string, rootWrapper: HTMLDivElement) {
        this.title.innerText = this.name;
        this.title.style.fontSize = '10px';
        this.title.style.marginBottom = '8px';
        this.title.style.color = '#878a99';

        this.wrapper.style.display = 'flex';
        this.wrapper.style.flexDirection = 'column';

        this.barWrapper.style.height = '6px';
        this.barWrapper.style.marginBottom = '8px';
        this.barWrapper.style.borderRadius = '4px';
        this.barWrapper.style.background = 'rgba(69, 203, 133, 0.15)';
        this.barWrapper.style.position = 'relative';

        this.bar.style.position = 'absolute';
        this.bar.style.top = '0';
        this.bar.style.bottom = '0';
        this.bar.style.left = '0';
        this.bar.style.borderRadius = '4px';
        this.bar.style.backgroundColor = '#45CB85';

        this.wrapper.appendChild(this.title);

        this._allocator = MemoryServer.getAllocator(this.name);

        this.barWrapper.appendChild(this.bar);
        this.wrapper.appendChild(this.barWrapper);
        rootWrapper.appendChild(this.wrapper);
    }

    update() {
        if (this._allocationTemp !== this._allocator.numAllocations) {
            this._allocationTemp = this._allocator.numAllocations;
            this.title.innerText = `${this.name} ${this._allocationTemp}`;
        }
        if (this._allocateMemoryTemp !== this._allocator.usedMemory) {
            this._allocateMemoryTemp = this._allocator.usedMemory;
            this.bar.style.width = `${(this._allocateMemoryTemp / this._allocator.byteSize) * 100}%`;
        }
    }
}
