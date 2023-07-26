import Vector from './Vector';

export default class Vector4 extends Vector {
    get x(): number {
        return this[0];
    }

    set x(v: number) {
        this[0] = v;
    }

    get y(): number {
        return this[1];
    }

    set y(v: number) {
        this[1] = v;
    }

    get z(): number {
        return this[2];
    }

    set z(v: number) {
        this[2] = v;
    }

    get w() {
        return this[3];
    }

    set w(v: number) {
        this[3] = v;
    }

    constructor(x = 0, y = 0, z = 0, w = 1) {
        super(x, y, z, w);
    }
}
