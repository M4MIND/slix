import { Transform } from '../../index';
import BaseComponent, { BaseComponentInterface } from '../components/BaseComponent';

export default class GameObject {
    public name = 'GameObject';
    public readonly transform: Transform;
    private readonly components: { [index: string]: BaseComponent } = {};
    private parent: GameObject | null = null;
    private children: GameObject | null = null;

    constructor(name?: string);
    constructor(name: string, ...args: BaseComponentInterface[]);
    constructor(name: string, ...args: BaseComponentInterface[]) {
        this.transform = this.addComponent<Transform>(Transform);
        if (name) this.name = name;
        if (args) this.addComponents(...args);
    }

    addComponent<T extends BaseComponent>(component: BaseComponentInterface): T {
        if (!this.components[component.name]) {
            this.components[component.name] = new component(this);
        }

        return this.components[component.name] as T;
    }

    addComponents(...args: BaseComponentInterface[]) {
        for (const componentConstructor of args) {
            this.addComponent(componentConstructor);
        }
    }

    getComponent<T extends BaseComponent>(component: BaseComponentInterface): T {
        if (!this.hasComponent(component)) throw new Error();
        return this.components[component.name] as T;
    }

    hasComponent(component: BaseComponentInterface) {
        return !!this.components[component.name];
    }
}
