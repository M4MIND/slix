export class ComponentGetException extends Error {
    constructor(name: string, entityId: number) {
        super(`Can't get {${name}} component for entity {${entityId}}. Component not attached`);
    }
}
