import GameObject from '../objects/GameObject';

export interface BaseComponentInterface {
    new (gameObject: GameObject): BaseComponent;
}

export default class BaseComponent {
    get gameObject() {
        return this._gameObject;
    }

    get transform() {
        return this._gameObject.transform;
    }

    get name() {
        return this._gameObject.name;
    }

    constructor(private _gameObject: GameObject) {}

    getComponent<T extends BaseComponent>(component: BaseComponentInterface): T {
        return this.gameObject.getComponent<T>(component) as T;
    }
}
