import CanvasWrapper from './canvas/CanvasWrapper';
import Context from './context/Context';
import WebGL2Context from './context/WebGL2Context';
import canvasManager from './manager/CanvasManager';

export default class RendererServer {
  private static canvasManager: canvasManager;

  public static startUp(settings: {
    canvasManager: {
      canvas: HTMLCanvasElement;
      context: Context;
    };
  }) {
    this.canvasManager = new canvasManager(
      new CanvasWrapper(
        settings.canvasManager.canvas,
        settings.canvasManager.context
      )
    );
  }
}

RendererServer.startUp({
  canvasManager: {
    canvas: document.createElement('canvas') as HTMLCanvasElement,
    context: WebGL2Context
  },
});
