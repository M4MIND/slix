import { UI } from '../UI';
import { UIContainer } from '../components/UIContainer';

export class UIDashboard extends UI {
    constructor() {
        super(document.createElement('div'));

        this.addStyle({
            height: '100vh',
            minHeight: '100vh',
            maxHeight: '100vh',
            minWidth: '100vw',
            maxWidth: '100vw',
            width: '100vw',
            display: 'grid',
            gridTemplateRows: 'minmax(0, min-content) minmax(max-content, 1fr) minmax(0, min-content)',
            gridTemplateColumns: 'minmax(0, min-content) minmax(max-content,1fr) minmax(0, min-content)',
            gridTemplateAreas: '"header header header" "leftColumn main rightColumn" "footer footer footer"',
        });

        this.appendContainer(new UIContainer('bottom'), 'header')
            .appendContainer(new UIContainer('right'), 'leftColumn')
            .appendContainer(new UIContainer(), 'main')
            .appendContainer(new UIContainer('left'), 'rightColumn')
            .appendContainer(new UIContainer('top'), 'footer');
    }

    appendContainer(element: UI, container: 'header' | 'leftColumn' | 'main' | 'rightColumn' | 'footer') {
        this.append(element);
        element.addStyle({
            gridArea: container,
        });

        return this;
    }
}
