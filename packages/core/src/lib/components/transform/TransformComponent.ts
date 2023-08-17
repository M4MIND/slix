import { GameObject } from '../../../index';
import BaseComponent from '../BaseComponent';
import { Quaternion, Vector3 } from 'mathf';

export default class TransformComponent extends BaseComponent {
    public rotation = new Quaternion();
    private up = Vector3.up;
    private right = Vector3.rigth;
    private forward = Vector3.forward;
    private hasChanged = false;
    private parent: GameObject | null = null;
    private children: GameObject[] = [];
    public get eulerAngles() {
        return this._eulerAngles;
    }
    get position(): Vector3 {
        return this._position;
    }
    get scale(): Vector3 {
        return this._scale;
    }

    private _position = Vector3.zero;
    private _scale = Vector3.one;
    private _eulerAngles = Vector3.zero;

    public getChild(index: number) {
        if (this.children[index]) return this.children;
        return null;
    }

    public getChildren() {
        return this.children;
    }

    public addChildren(gameObject: GameObject) {
        this.children.push(gameObject);
    }

    public setParent(gameObject: GameObject) {
        if (gameObject.instanceID === this.instanceID) return;

        gameObject.transform.addChildren(this.gameObject);
        this.transform.parent = gameObject;
        this.gameObject.scene.takeOut(this.gameObject);
    }

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
