import { ComponentManager } from './component/ComponentManager';
import { COMPONENT } from './component/ComponentPool';
import { Entity } from './entity/Entity';
import { EntityManager } from './entity/EntityManager';
import { SystemsGroup } from './system/SystemsGroup';
import { SystemsManager } from './system/SystemsManager';

export class World {
    private readonly componentManager: ComponentManager;
    private readonly systemManager: SystemsManager;
    private readonly entityManager: EntityManager;
    constructor() {
        this.componentManager = new ComponentManager(this);
        this.systemManager = new SystemsManager(this);
        this.entityManager = new EntityManager(this);
    }

    registerComponent<T extends object>(component: COMPONENT<T>) {
        this.componentManager.register<T>(component);

        return this;
    }

    addComponent<T extends object>(entity: Entity, component: COMPONENT<T>): T {
        if (component.id === undefined) throw new Error();
        return this.componentManager.add<T>(entity, component);
    }

    getComponent<T extends object>(entity: Entity, component: COMPONENT<T>) {
        if (component.id === undefined) throw new Error();
        return this.componentManager.get<T>(entity, component);
    }

    removeComponent<T extends object>(entity: Entity, component: COMPONENT<T>) {
        if (component.id === undefined) throw new Error();
        this.componentManager.delete<T>(entity, component);
    }

    createSystems(name: string) {
        return this.systemManager.addSystems(new SystemsGroup(this), name);
    }

    getSystemsByName(index: string) {
        return this.systemManager.getSystemsByName(index);
    }

    getSystems() {
        return this.systemManager.getSystems();
    }

    getSystemsKeys() {
        return this.systemManager.getSystemsKeys();
    }

    init() {
        this.systemManager.init();
    }

    run() {
        this.systemManager.run();
    }

    newEntity() {
        return this.entityManager.new();
    }

    deleteEntity(entity: Entity) {
        this.entityManager.delete(entity);
    }

    getEntitiesInWorld() {
        return this.entityManager.entitiesInWorld;
    }
}
