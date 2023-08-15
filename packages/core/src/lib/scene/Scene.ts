import { GameObject } from '../../index';

export default class Scene {
    private readonly rootGameObjects: GameObject[] = [];

    constructor(public readonly name: string) {}

    addGameObject(gameObject: GameObject) {
        this.rootGameObjects.push(gameObject);
    }

    getGameObjects() {
        return this.rootGameObjects;
    }
}
