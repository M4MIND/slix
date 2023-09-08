import { UI } from './UI';

export class UIDashboard extends UI {
    constructor() {
        super(document.createElement('div'));
        const wrapper = document.getElementById('ecsDebug');

        if (wrapper) {
            wrapper.appendChild(this.root);
            this.addStyle({
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'start',
                padding: '1rem',
                backgroundColor: '#f4f4f4',
            });
        }

        const styles = document.createElement('style');
        styles.innerHTML = `
        * {
            box-sizing: border-box;
        }
        
        html {
            font-size: 14px;
        }
        
        html, body {
            margin: 0;
            padding: 0;
            font-family: "Inter UI", -apple-system, BlinkMacSystemFont,  "Segoe UI", "Roboto", 
"Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
        }
        `;

        document.head.appendChild(styles);
    }
}
