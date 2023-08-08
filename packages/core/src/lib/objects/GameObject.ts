import { TransformComponent } from '../../index';
import BaseComponent, { BaseComponentInterface } from '../components/BaseComponent';
import BaseObject from './BaseObject';

export default class GameObject extends BaseObject {
    public name = 'GameObject';
    public readonly transform: TransformComponent;
    private readonly components: { [index: string]: BaseComponent } = {};
    private parent: GameObject | null = null;
    private children: GameObject | null = null;

    constructor(name?: string);
    constructor(name: string, ...args: BaseComponentInterface[]);
    constructor(name: string, ...args: BaseComponentInterface[]) {
        super();

        this.transform = this.addComponent<TransformComponent>(TransformComponent);
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
