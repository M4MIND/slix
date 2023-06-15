import Context from './Context';

export default class WebGL2Context extends Context {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    
    this.context = canvas.getContext('webgl2') as WebGL2RenderingContext;
  }
}
