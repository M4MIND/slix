import { UI } from '../UI';
import { UIText } from '../text/UIText';
import { UIColor } from '../utils/UIColor';

export class UICardHeader extends UI {
    public readonly title: UIText;
    constructor() {
        super(document.createElement('div'));
        this.title = new UIText();

        this.addStyle({
            padding: '16px 16px 7px 20px',
            minHeight: '42px',
        });

        this.title.addStyle({
            textTransform: 'uppercase',
            fontSize: '12px',
            fontWeight: '600',
        });

        this.append(this.title);
    }
}