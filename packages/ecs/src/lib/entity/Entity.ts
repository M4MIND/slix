import { World } from '../World';
import { COMPONENT } from '../component/ComponentPool';

export class Entity {
    public readonly id: number;
    private readonly world: World;
    private componentsCount = 0;

    constructor(id: number, world: World) {
        this.id = id;
        this.world = world;
    }

    addComponent<T extends object>(component: COMPONENT<T>) {
        this.world.addComponent<T>(this, component);

        return this;
    }
}
