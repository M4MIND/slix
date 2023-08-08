import BaseObject from '../objects/BaseObject';
import GameObject from '../objects/GameObject';

export interface BaseComponentInterface {
    new (gameObject: GameObject): BaseComponent;
}

export default class BaseComponent extends BaseObject {
    get gameObject() {
        return this._gameObject;
    }

    get transform() {
        return this._gameObject.transform;
    }

    get name() {
        return this._gameObject.name;
    }

    constructor(private _gameObject: GameObject) {
        super();
    }

    getComponent<T extends BaseComponent>(component: BaseComponentInterface): T {
        return this._gameObject.getComponent<T>(component) as T;
    }
}
