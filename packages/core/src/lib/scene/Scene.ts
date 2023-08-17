import { GameObject } from '../../index';
import SceneGameObject from '../objects/SceneGameObject';

export default class Scene {
    public readonly sceneGameObject: SceneGameObject;
    constructor(public readonly name: string) {
        this.sceneGameObject = new SceneGameObject(name);
    }
    addGameObject(gameObject: GameObject) {
        this.sceneGameObject.transform.addChildren(gameObject);
    }

    getGameObjects() {}
}
