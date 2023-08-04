export default class CanvasManager {
    public readonly canvas: HTMLCanvasElement;

    private viewport: { x: number; y: number } = {
        x: 0,
        y: 0,
    };

    get width() {
        return this.viewport.x;
    }

    get height() {
        return this.viewport.y;
    }

    constructor(canvas: HTMLCanvasElement, width: number, heigth: number) {
        this.canvas = canvas;
        this.setWidth(width);
        this.setHeight(heigth);
    }

    public setWidth(v: number) {
        this.canvas.width = v;
        this.viewport.x = v;

        return this;
    }

    public setHeight(v: number) {
        this.canvas.height = v;
        this.viewport.y = v;

        return this;
    }
}
