import Vector from './Vector';

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

    constructor(x = 0, y = 0) {
        super(x, y);
    }
}
