import { ComponentManager } from './component/ComponentManager';
import { COMPONENT } from './component/ComponentPool';
import { Entity } from './entity/Entity';
import { EntityManager } from './entity/EntityManager';
import { EventManager, Events, events } from './events/EventManager';
import { SystemsGroup } from './system/SystemsGroup';
import { SystemsManager } from './system/SystemsManager';

export class World {
    private readonly componentManager: ComponentManager;
    private readonly systemManager: SystemsManager;
    private readonly entityManager: EntityManager;
    private readonly eventManager: EventManager;
    constructor() {
        this.componentManager = new ComponentManager(this);
        this.systemManager = new SystemsManager(this);
        this.entityManager = new EntityManager(this);
        this.eventManager = new EventManager(this);
    }

    registerComponent<T extends object>(component: COMPONENT<T>) {
        this.componentManager.register<T>(component);

        return this;
    }

    addComponent<T extends object>(entity: Entity, component: COMPONENT<T>): T {
        if (component.id === undefined) throw new Error();
        const componentInstance = this.componentManager.add<T>(entity, component);

        this.eventManager.dispatch('addComponent', { entity: entity, component: componentInstance });

        return componentInstance;
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
        const entity = this.entityManager.new();

        this.eventManager.dispatch('addEntity', entity);

        return entity;
    }

    deleteEntity(entity: Entity) {
        this.entityManager.delete(entity);
        this.eventManager.dispatch('removeEntity', entity);
    }

    getEntitiesInWorld() {
        return this.entityManager.entitiesInWorld;
    }

    subscribeEvent<K extends keyof typeof events>(event: K, callback: Events[K]) {
        this.eventManager.subscribe(event, callback);
    }
}
