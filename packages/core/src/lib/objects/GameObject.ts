import BaseComponent, { BaseComponentInterface } from '../components/BaseComponent';
import { Transform } from 'core';

export default class GameObject {
    public name = 'GameObject';
    public readonly transform: Transform;
    private readonly components: { [index: string]: BaseComponent } = {};
    constructor() {
        this.transform = this.addComponent<Transform>(Transform);
    }

    addComponent<T extends BaseComponent>(component: BaseComponentInterface): T {
        if (!this.components[component.name]) {
            this.components[component.name] = new component(this);
        }

        return this.components[component.name] as T;
    }

    getComponent<T extends BaseComponent>(component: BaseComponentInterface): T | null {
        return this.components[component.name] ? (this.components[component.name] as T) : null;
    }
}
