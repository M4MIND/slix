import { Float32NativeArray } from 'memory';

export default class Color extends Float32NativeArray {
    get r() {
        return this[0];
    }
    get g() {
        return this[1];
    }
    get b() {
        return this[2];
    }
    get a() {
        return this[3];
    }
    constructor(r: number, g: number, b: number, a: number) {
        super([r, g, b, a]);
    }
    static get black() {
        return new Color(0, 0, 0, 1);
    }
    static get blue() {
        return new Color(0, 0, 1, 1);
    }
    static get clear() {
        return new Color(0, 0, 0, 0);
    }

    static get cyan() {
        return new Color(0, 1, 1, 1);
    }
    static get gray() {
        return new Color(0.5, 0.5, 0.5, 0.5);
    }

    static get green() {
        return new Color(0, 1, 0, 1);
    }

    static get magenta() {
        return new Color(1, 0, 1, 1);
    }

    static get red() {
        return new Color(1, 0, 0, 1);
    }

    static get white() {
        return new Color(1, 1, 1, 1);
    }

    static get yellow() {
        return new Color(1, 0.92, 0.016, 1);
    }

    set r(v: number) {
        this[0] = v;
    }

    set g(v: number) {
        this[1] = v;
    }

    set b(v: number) {
        this[2] = v;
    }

    set a(v: number) {
        this[3] = v;
    }
}
