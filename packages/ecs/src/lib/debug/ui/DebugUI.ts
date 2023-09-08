import { UI } from './UI';
import { UIDashboard } from './UIDashboard';

export class DebugUI {
    private static dashboard: UIDashboard;
    static init() {
        this.dashboard = new UIDashboard();
    }

    static append(element: UI) {
        this.dashboard.append(element);
    }
}
