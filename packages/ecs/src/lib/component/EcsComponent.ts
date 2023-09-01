import 'reflect-metadata';

export class EcsComponent {
    static _id = 2;
    static readonly id: number;
}

export function EcsMakeComponentFilter(prefix: string): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        const original = Reflect.getOwnPropertyDescriptor(target, propertyKey);

        console.log(original, prefix);
        Reflect.deleteProperty(target, propertyKey);
        Reflect.defineProperty(target, propertyKey, {
            get: () => 'debug new property',
            enumerable: true,
            configurable: true,
        });
    };
}
export interface IEcsComponent {}

export interface IEcsComponentReset extends IEcsComponent {
    reset(): void;
}
