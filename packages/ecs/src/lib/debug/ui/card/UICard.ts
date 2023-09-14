import { UI } from '../UI';
import { UICardBody } from './UICardBody';
import { UICardHeader } from './UICardHeader';

export class UICard extends UI {
    public readonly header: UICardHeader;
    public readonly body: UICardBody;

    constructor(title?: string) {
        super(document.createElement('div'));
        this.header = new UICardHeader();
        this.body = new UICardBody();

        if (title) this.header.title.text = title;

        this.addStyle({
            background: '#FFF',
            boxShadow: '0 1px 2px 0 rgba(33, 33, 33, 0.14), 0 0 1px 0 rgba(0, 0, 0, 0.14)',
            borderRadius: '4px',
            minWidth: '280px',
            marginBottom: '0.4rem',
            marginRight: '0.4rem',
        });

        this.append(this.header);
        this.append(this.body);
    }
}
