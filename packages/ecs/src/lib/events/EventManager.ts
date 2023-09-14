import { World } from '../World';
import { Entity } from '../entity/Entity';

export class EventManager {
    private map: { [index: string]: ((...args: any) => void)[] } = {};
    constructor(private readonly world: World) {}
    subscribe<K extends keyof typeof events>(event: K, callback: Events[K]) {
        if (this.map[event] == undefined) this.map[event] = [];
        this.map[event].push(callback);
    }
    dispatch<K extends keyof typeof events>(event: K, props: EventsProps[K]) {
        if (this.map[event] === undefined) return;
        for (const _event of this.map[event]) {
            _event(props);
        }
    }
}

export const events = {
    addEntity: 'addEntity',
    removeEntity: 'removeEntity',
    addComponent: 'addComponent',
    removeComponent: 'removeComponent',
} as const;

type EventsProps = {
    [events.addEntity]: Entity;
    [events.removeEntity]: Entity;
    [events.addComponent]: { entity: Entity; component: object };
    [events.removeComponent]: { entity: Entity; component: object };
};

export type Events = {
    [events.addEntity]: (entity: Entity) => void;
    [events.removeEntity]: (entity: Entity) => void;
    [events.addComponent]: (event: { entity: Entity; component: object }) => void;
    [events.removeComponent]: (event: { entity: Entity; component: object }) => void;
};
