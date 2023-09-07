export class ComponentDeleteException extends Error {
    constructor(name: string) {
        super(`Can't delete component ${name}`);
    }
}
