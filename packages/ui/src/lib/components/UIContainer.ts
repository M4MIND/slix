import { UI } from '../UI';

class UIContainerResizeLine extends UI {
    private callback!: (x: number, y: number) => void;
    private temp = { x: 0, y: 0 };
    private resize = (e: MouseEvent) => {
        if (this.callback === null) return;

        this.callback(Math.ceil(this.temp.x - e.pageX), Math.ceil(this.temp.y - e.pageY));

        this.temp.x = e.pageX;
        this.temp.y = e.pageY;
    };
    constructor(position: 'top' | 'left' | 'right' | 'bottom') {
        super(document.createElement('div'));

        this.addStyle({
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.1)',
        });

        if (position === 'top' || position === 'bottom') {
            this.addStyle({
                left: 0,
                right: 0,
                height: '2px',
                cursor: 'n-resize',
            });

            if (position === 'top') {
                this.addStyle({ top: 0 });
            } else {
                this.addStyle({ bottom: 0 });
            }
        }

        if (position === 'left' || position === 'right') {
            this.addStyle({
                top: 0,
                bottom: 0,
                width: '2px',
                cursor: 'e-resize',
            });

            if (position === 'right') {
                this.addStyle({ right: 0 });
            } else {
                this.addStyle({ left: 0 });
            }
        }

        this.addEventListener('mousedown', (e) => {
            this.temp.x = this.root.getBoundingClientRect().x;
            this.temp.y = this.root.getBoundingClientRect().y;
            document.addEventListener('mousemove', this.resize);
        });

        this.addEventListener('mouseup', (e) => {
            document.removeEventListener('mousemove', this.resize);
        });
    }

    onResize(callback: (x: number, y: number) => void) {
        this.callback = callback;

        return this;
    }
}

class UIContainersResizeCollection {
    private static collection: UIContainer[] = [];
    static checkAABB(a: UIContainer) {
        a.addStyle({ backgroundColor: 'green' });
        a.calculateAABB();

        for (const b of this.collection) {
            if (b.id === a.id) continue;
            b.calculateAABB();

            if (a.aabb.r <= b.aabb.l || a.aabb.l >= b.aabb.r || a.aabb.b <= b.aabb.t || a.aabb.t >= b.aabb.b) {
                b.addStyle({ backgroundColor: 'yellow' });
                continue;
            } else {
                b.addStyle({ backgroundColor: 'pink' });
                return true;
            }
        }

        return false;
    }
    static add(container: UIContainer) {
        this.collection.push(container);
    }
}

export class UIContainer extends UI {
    public readonly id = self.crypto.randomUUID();
    private _width = 32;
    private _height = 32;
    public readonly aabb = {
        l: 0,
        r: 0,
        t: 0,
        b: 0,
    };

    private onResize = (x: number, y: number) => {
        if (UIContainersResizeCollection.checkAABB(this)) {
            return;
        }

        if (this.resize === 'top') this.height = this._height + y;
        if (this.resize === 'bottom') this.height = this._height - y;
        if (this.resize === 'right') this.width = this._width - x;
        if (this.resize === 'left') this.width = this._width + x;
    };
    private set height(v: number) {
        this._height = v;
        this.root.style.height = v + 'px';
    }

    private set width(v: number) {
        this._width = v;
        this.root.style.width = v + 'px';
    }

    constructor(public readonly resize: 'top' | 'left' | 'right' | 'bottom' | null = null) {
        super(document.createElement('div'));

        this.addStyle({
            minWidth: this._width + 'px',
            minHeight: this._height + 'px',
            position: 'relative',
        });

        if (resize === null) return;

        UIContainersResizeCollection.add(this);
        const line = new UIContainerResizeLine(resize);

        this.append(line);

        line.onResize(this.onResize);
    }

    calculateAABB() {
        this.aabb.l = this.root.offsetLeft;
        this.aabb.r = this.root.offsetLeft + this.root.offsetWidth;
        this.aabb.t = this.root.offsetTop;
        this.aabb.b = this.root.offsetTop + this.root.offsetHeight;
    }
}
