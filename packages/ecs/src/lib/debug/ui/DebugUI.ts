import { UI } from './UI';
import { UIDashboard } from './UIDashboard';

class UIWindow {
    private window: Window;
    constructor() {
        this.window = window;
        this.window.onselectstart = (e) => false;
    }

    getSize() {
        return {
            x: this.window.innerWidth,
            y: this.window.innerHeight,
        };
    }

    getWidth() {
        return this.window.innerWidth;
    }

    getHeight() {
        return this.window.innerHeight;
    }
}

export class DebugUI {
    private static dashboard: UIDashboard;

    static UIWindow = new UIWindow();

    static init() {
        this.dashboard = new UIDashboard();
    }

    static append(element: UI) {
        this.dashboard.append(element);
    }
}
