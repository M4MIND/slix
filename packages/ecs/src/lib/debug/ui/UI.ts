import { CSSProperties } from 'react';
import { v } from 'vitest/dist/types-198fd1d9';

export class UI {
    public readonly root: HTMLElement;
    constructor(element: HTMLElement) {
        this.root = element;
    }

    addStyle(styles: Partial<CSSProperties>) {
        for (const key of Object.keys(styles)) {
            // @ts-ignore
            this.root.style[key] = styles[key];
        }
    }

    append(element: UI) {
        this.root.append(element.root);

        return this;
    }

    remove() {
        this.root.remove();
    }

    addEventListener<K extends keyof HTMLElementEventMap>(event: K, callback: () => void) {
        this.root.addEventListener('click', callback);
    }
}
