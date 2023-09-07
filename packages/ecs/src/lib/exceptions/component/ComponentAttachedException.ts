export class ComponentAttachedException extends Error {
    constructor(name: string, entityId: number) {
        super(`Component {${name}} already attached to entity {${entityId}}`);
    }
}
