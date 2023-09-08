import { UI } from '../UI';

export class UIText extends UI {
    get text() {
        return this.root.innerText;
    }

    set text(v: string) {
        this.root.innerText = v;
    }
    constructor(element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' = 'p') {
        super(document.createElement(element));

        this.addStyle({
            margin: 0,
            padding: 0,
            color: 'rgb(33, 37, 41)',
        });
    }
}
