import Vector2 from '../vector/Vector2';
import Vector3 from '../vector/Vector3';

type components = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];

export default class Matrix4 extends Array<number> {
    public get m0x0() {
        return this[0];
    }

    public get m0x1() {
        return this[1];
    }

    public get m0x2() {
        return this[2];
    }

    public get m0x3() {
        return this[3];
    }

    public get m1x0() {
        return this[4];
    }

    public get m1x1() {
        return this[5];
    }

    public get m1x2() {
        return this[6];
    }

    public get m1x3() {
        return this[7];
    }

    public get m2x0() {
        return this[8];
    }

    public get m2x1() {
        return this[9];
    }

    public get m2x2() {
        return this[10];
    }

    public get m2x3() {
        return this[11];
    }

    public get m3x0() {
        return this[12];
    }

    public get m3x1() {
        return this[13];
    }

    public get m3x2() {
        return this[14];
    }

    public get m3x3() {
        return this[15];
    }

    constructor(...args: components) {
        super(...args);
    }

    public static default() {
        return new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    public static fromVectors(a: Vector3, b: Vector3, c: Vector3) {
        return new Matrix4(a.x, b.x, c.x, 0, a.y, b.y, c.y, 0, a.z, b.z, c.z, 0, 0, 0, 0, 1);
    }
}
