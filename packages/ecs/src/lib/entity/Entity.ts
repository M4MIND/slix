import { World } from '../World';
import { COMPONENT } from '../component/ComponentPool';

export class Entity {
    get componentsIds(): Set<number> {
        return this._componentsIds;
    }
    get componentsCount(): number {
        return this._componentsCount;
    }
    public readonly id: number;
    private readonly world: World;
    private _componentsCount = 0;
    private _componentsIds: Set<number> = new Set<number>();

    constructor(id: number, world: World) {
        this.id = id;
        this.world = world;
    }

    addComponent<T extends object>(component: COMPONENT<T>) {
        this.world.addComponent<T>(this, component);
        this._componentsCount++;
        this._componentsIds.add(component.id as number);

        return this;
    }

    getComponent<T extends object>(component: COMPONENT<T>): T {
        return this.world.getComponent<T>(this, component) as T;
    }

    getComponentCount() {
        return this._componentsCount;
    }

    removeComponent<T extends object>(component: COMPONENT<T>) {
        this.world.removeComponent(this, component);
        this._componentsCount--;
        this._componentsIds.delete(component.id as number);

        return this;
    }

    delete() {
        this._componentsIds.clear();
        this._componentsCount = 0;
        this.world.deleteEntity(this);
    }
}
