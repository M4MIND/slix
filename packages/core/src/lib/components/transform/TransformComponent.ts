import BaseComponent from '../BaseComponent';
import { Quaternion, Vector3 } from 'mathf';

export default class TransformComponent extends BaseComponent {
    public get eulerAngles() {
        return this._eulerAngles;
    }
    get position(): Vector3 {
        return this._position;
    }
    get scale(): Vector3 {
        return this._scale;
    }
    public rotation = new Quaternion();
    private up = Vector3.up;
    private right = Vector3.rigth;
    private forward = Vector3.forward;
    private hasChanged = false;
    private _position = Vector3.zero;
    private _scale = Vector3.one;
    private _eulerAngles = Vector3.zero;

    set eulerAngles(v: Vector3) {
        this.hasChanged = true;
        this._eulerAngles = v;
    }

    set position(value: Vector3) {
        this.hasChanged = true;
        this._position = value;
    }

    set scale(value: Vector3) {
        this.hasChanged = true;
        this._scale = value;
    }
}
