import { World } from '../World';
import { Entity } from '../entity/Entity';
import { COMPONENT, ComponentPool } from './ComponentPool';

export class ComponentManager {
    private allComponents: COMPONENT<object>[] = [];
    private allComponentsMap: { [index: number]: ComponentPool<object> } = {};
    private allComponentsKeys: number[] = [];
    constructor(private readonly world: World) {}

    register<T extends object>(component: COMPONENT<T>) {
        if (component.id !== undefined) return;

        component.id = this.allComponents.length;

        this.allComponents.push(component);
        this.allComponentsMap[component.id] = new ComponentPool<T>(component);
        this.allComponentsKeys.push(component.id);
    }

    add<T extends object>(entity: Entity, component: COMPONENT<T>) {}

    hasPool<T extends object>(component: COMPONENT<T>) {
        return this.allComponentsMap[component.id as number] !== undefined;
    }

    getPool<T extends object>(component: COMPONENT<T>) {
        return this.allComponentsMap[component.id as number];
    }
}
