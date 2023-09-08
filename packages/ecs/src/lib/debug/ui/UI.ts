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
    }

    append(element: UI) {
        this.root.append(element.root);

        return this;
    }
}
