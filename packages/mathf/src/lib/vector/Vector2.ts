import Vector from './Vector';

type components = [number, number];

export default class Vector2 extends Vector {
    get x() {
        return this[0];
    }

    set x(n) {
        this[0] = n;
    }

    get y() {
        return this[0];
    }

    set y(n) {
        this[0] = n;
    }

    constructor(...args: components) {
        super(...args);
    }
}
