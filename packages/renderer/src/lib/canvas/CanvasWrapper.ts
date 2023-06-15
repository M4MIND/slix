import Context from '../context/Context';
import WebGL2Context from '../context/WebGL2Context';

export default class CanvasWrapper {
    constructor(
        public readonly canvas: HTMLCanvasElement,
        public readonly context: Context
    ) {
        this.context = new WebGL2Context(canvas);
    }
}
