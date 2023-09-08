import { UI } from '../UI';

export class UICardBody extends UI {
    constructor() {
        super(document.createElement('div'));

        this.addStyle({
            padding: '20px',
            paddingTop: 0,
        });
    }
}
