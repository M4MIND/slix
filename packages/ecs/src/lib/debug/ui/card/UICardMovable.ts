import { DebugUI } from '../DebugUI';
import { UICard } from './UICard';

export class UICardMovable extends UICard {
    public readonly position: { x: number; y: number } = {
        x: 0,
        y: 0,
    };

    private movable = false;
    private move = (e: MouseEvent) => {
        if (!this.movable) return;
        let top = e.pageY - this.position.y;
        let left = e.pageX - this.position.x;

        if (left < 0) {
            left = 0;
        } else if (left > DebugUI.UIWindow.getWidth() - this.root.offsetWidth) {
            left = DebugUI.UIWindow.getWidth() - this.root.offsetWidth;
        }

        if (top < 0) {
            top = 0;
        } else if (top > DebugUI.UIWindow.getHeight() - this.root.offsetHeight) {
            top = DebugUI.UIWindow.getHeight() - this.root.offsetHeight;
        }

        this.addStyle({
            top: top + 'px',
            left: left + 'px',
        });
    };
    constructor(title?: string) {
        super(title);

        this.addStyle({
            position: 'absolute',
        });

        this.header.addStyle({
            cursor: 'move',
        });

        this.header.addEventListener('mousedown', (e) => {
            this.position.x = e.offsetX;
            this.position.y = e.offsetY;

            this.movable = true;
        });

        document.addEventListener('mousemove', this.move);

        this.header.addEventListener('mouseup', () => {
            this.movable = false;
        });
    }
}
