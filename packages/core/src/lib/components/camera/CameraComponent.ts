import BaseComponent from '../BaseComponent';
import { MathHelper, Matrix4 } from 'mathf';
import { RendererServer } from 'renderer';

export default class CameraComponent extends BaseComponent {
    private _clipping: {
        near: number;
        far: number;
    } = { near: 0.3, far: 1000 };

    private _fieldOfView = 70;

    get clipping() {
        return this._clipping;
    }

    set clipping(v: { near: number; far: number }) {
        this._clipping = v;
        this.recalculateProjectionMatrix();
    }
    get projectionMatrix() {
        return this._projectionMatrix;
    }

    set projectionMatrix(v: Matrix4) {
        this._projectionMatrix = v;
    }

    get fieldOfView() {
        return this._fieldOfView;
    }
    set fieldOfView(v: number) {
        this._fieldOfView = v;
        this.recalculateProjectionMatrix();
    }

    private _projectionMatrix = this.recalculateProjectionMatrix();

    private recalculateProjectionMatrix() {
        this.projectionMatrix = Matrix4.projection(
            MathHelper.degToRad(this._fieldOfView),
            RendererServer.canvasManager.width / RendererServer.canvasManager.height,
            this._clipping.near,
            this._clipping.far
        );

        return this.projectionMatrix;
    }
}
