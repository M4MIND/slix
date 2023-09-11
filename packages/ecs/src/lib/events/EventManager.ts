import { Entity } from '../entity/Entity';
import { World } from 'ecs';

export const events = {
    addEntity: 'addEntity',
    removeEntity: 'removeEntity',
} as const;

export type Events = {
    [events.addEntity]: (entity: Entity) => void;
    [events.removeEntity]: (entity: Entity) => void;
};

type EventsProps = {
    [events.addEntity]: Entity;
    [events.removeEntity]: Entity;
};

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
