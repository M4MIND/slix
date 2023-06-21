type components = [number, number];

export default class Vector2 extends Array<number> {
    constructor(...args: components) {
        super(...args);
    }
}
