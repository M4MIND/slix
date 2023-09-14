import { UIDashboard } from './dashboard/UIDashboard';

export class UISlix {
    private static dashboard: UIDashboard;
    static init() {
        this.dashboard = new UIDashboard();

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

        document.body.appendChild(this.dashboard.root);
    }
}
