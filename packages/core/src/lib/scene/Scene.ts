import { GameObject } from '../../index';
import SceneGameObject from '../objects/SceneGameObject';

export default class Scene {
    public root: GameObject[] = [];
    constructor(public readonly name: string) {}
    addGameObject(gameObject: GameObject) {
        this.root.push(gameObject);
    }
    takeOut(gameObject: GameObject) {
        const index = this.searchIndexOfGameObject(gameObject);
        if (index !== null) delete this.root[index];
    }

    private searchIndexOfGameObject(gameObject: GameObject): number | null {
        for (const index in this.root) {
            if (gameObject.instanceID === this.root[index].instanceID) return Number.parseInt(index);
        }

        return null;
    }
}
