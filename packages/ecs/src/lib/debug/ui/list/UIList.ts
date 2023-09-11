import { UI } from '../UI';
import { UIText } from '../text/UIText';

class UiListItem extends UI {
    public readonly text = new UIText();
    constructor() {
        super(document.createElement('li'));

        this.append(this.text);
    }
}

export class UIList extends UI {
    private map: { [index: number]: UiListItem } = {};
    constructor() {
        super(document.createElement('ul'));

        this.addStyle({
            margin: '0',
            padding: '0',
            listStyle: 'none',
            cursor: 'pointer',
        });
    }

    add(index: number, name: string) {
        if (this.map[index]) return;
        const item = new UiListItem();

        item.text.text = name;

        this.map[index] = item;

        this.append(item);

        return this.map[index];
    }

    delete(index: number) {
        this.map[index].remove();
        delete this.map[index];
    }

    has(index: number) {
        return this.map[index] !== undefined;
    }
}
