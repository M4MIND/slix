import BaseComponent from '../BaseComponent';
import { Quaternion, Vector3 } from 'mathf';

export default class Transform extends BaseComponent {
    private _position = Vector3.zero;
    private _scale = Vector3.one;
    public rotation = new Quaternion();
    private _eulerAngles = Vector3.zero;
    private up = Vector3.up;
    private right = Vector3.rigth;
    private forward = Vector3.forward;
    private hasChanged = false;

    public get eulerAngles() {
        return this._eulerAngles;
    }

    public set eulerAngles(v: Vector3) {
        this._eulerAngles = v;
    }

    get position(): Vector3 {
        return this._position;
    }

    set position(value: Vector3) {
        this.hasChanged = true;
        this._position = value;
    }

    get scale(): Vector3 {
        return this._scale;
    }

    set scale(value: Vector3) {
        this.hasChanged = true;
        this._scale = value;
    }
}
