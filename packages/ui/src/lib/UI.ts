import { CSSProperties } from 'react';

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

        return this;
    }

    append(element: UI) {
        this.root.append(element.root);

        return this;
    }

    remove() {
        this.root.remove();
    }

    addEventListener<K extends keyof HTMLElementEventMap>(
        event: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
    ) {
        this.root.addEventListener(event, listener);
    }
}
