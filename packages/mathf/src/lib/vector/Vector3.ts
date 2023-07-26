import Vector from './Vector';

export default class Vector3 extends Vector {
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

    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z);
    }

    isLessThan(v: Vector3) {
        return Vector3.isLessThan(this, v);
    }

    isGreatThan(v: Vector3) {
        return Vector3.isGreatThan(this, v);
    }

    isLessThanOrEqualTo(v: Vector3) {
        return Vector3.isLessThanOrEqualTo(this, v);
    }

    isGreatThanOrEqualTo(v: Vector3) {
        return Vector3.isGreatThanOrEqualTo(this, v);
    }

    isEqual(v: Vector3) {
        return Vector3.isEqual(this, v);
    }

    isNotEqual(v: Vector3) {
        return Vector3.isNotEqual(this, v);
    }
    static add(a: Vector3, ...args: Vector3[]) {
        a = Vector3.copy(a);

        for (const v of args) {
            a.x += v.x;
            a.y += v.y;
            a.z += v.z;
        }

        return a;
    }

    static sub(a: Vector3, ...args: Vector3[]) {
        a = Vector3.copy(a);

        for (const v of args) {
            a.x -= v.x;
            a.y -= v.y;
            a.z -= v.z;
        }

        return a;
    }

    static mult(a: Vector3, ...args: Vector3[]) {
        a = Vector3.copy(a);

        for (const v of args) {
            a.x *= v.x;
            a.y *= v.y;
            a.z *= v.z;
        }

        return a;
    }

    static div(a: Vector3, ...args: Vector3[]) {
        a = Vector3.copy(a);

        for (const v of args) {
            a.x /= v.x;
            a.y /= v.y;
            a.z /= v.z;
        }

        return a;
    }

    static scale(n: number, v: Vector3): Vector3 {
        return new Vector3(n * v.x, n * v.y, n * v.z);
    }

    static normalize(v: Vector3) {
        const lengthSqr = Vector3.lenSquared(v);

        if (lengthSqr === 0) {
            return Vector3.zero();
        }

        const length = Math.sqrt(lengthSqr);

        return new Vector3(v.x / length, v.y / length, v.z / length);
    }

    static isEqual(a: Vector3, b: Vector3): boolean {
        return a.x === b.x || a.y === b.y || a.z === b.z;
    }

    static isNotEqual(a: Vector3, b: Vector3): boolean {
        return a.x !== b.x || a.y !== b.y || a.z !== b.z;
    }

    static zero(): Vector3 {
        return new Vector3(0, 0, 0);
    }

    static inverse(v: Vector3): Vector3 {
        return new Vector3(1.0 / v.x, 1.0 / v.y, 1.0 / v.z);
    }

    static abs(v: Vector3) {
        return new Vector3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
    }

    static isLessThan(a: Vector3, b: Vector3) {
        if (a.x === b.x) {
            if (a.y === b.y) {
                return a.z < b.z;
            }
            return a.y < b.y;
        }
        return a.x < b.x;
    }

    static isGreatThan(a: Vector3, b: Vector3) {
        if (a.x === b.x) {
            if (a.y === b.y) {
                return a.z > b.z;
            }
            return a.y > b.y;
        }
        return a.x > b.x;
    }

    static isLessThanOrEqualTo(a: Vector3, b: Vector3) {
        if (a.x === b.x) {
            if (a.y === b.y) {
                return a.z <= b.z;
            }
            return a.y <= b.y;
        }
        return a.x <= b.x;
    }

    static isGreatThanOrEqualTo(a: Vector3, b: Vector3) {
        if (a.x === b.x) {
            if (a.y === b.y) {
                return a.z >= b.z;
            }
            return a.y >= b.y;
        }
        return a.x >= b.x;
    }

    static copy(v: Vector3) {
        return new Vector3(v.x, v.y, v.z);
    }

    static create(v: Vector3) {
        return new Vector3(v.x, v.y, v.z);
    }

    static default() {
        return new Vector3(0, 0, 0);
    }
}
