import Vector from './Vector';

type components = [number, number, number, number];

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

    set w(v: number) {
        this[3] = v;
    }

    get w() {
        return this[3];
    }

    constructor(...args: components) {
        super(...args);
    }
}
