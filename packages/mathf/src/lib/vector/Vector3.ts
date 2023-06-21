type components = [number, number, number];

export default class Vector3 extends Array<number> {
    public get x(): number {
        return this[0];
    }

    public set x(v: number) {
        this[0] = v;
    }

    public get y(): number {
        return this[1];
    }

    public set y(v: number) {
        this[1] = v;
    }

    public get z(): number {
        return this[2];
    }

    public set z(v: number) {
        this[2] = v;
    }

    constructor(...args: components) {
        super(...args);
    }

    public add(v: Vector3): Vector3 {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    }

    public sub(v: Vector3): Vector3 {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
    }

    public mult(v: Vector3): Vector3 {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;

        return this;
    }

    public div(v: Vector3): Vector3 {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;

        return this;
    }

    public isLessThan(v: Vector3) {
        if (this.x === v.x) {
            if (this.y === v.y) {
                return this.z < v.z;
            }
            return this.y < v.y;
        }

        return this.x < v.x;
    }

    public isGreatThan(v: Vector3) {
        if (this.x === v.x) {
            if (this.y === v.y) {
                return this.z > v.z;
            }

            return this.y > v.y;
        }

        return this.x > v.x;
    }

    public isLessThanOrEqualTo(v: Vector3) {
        if (this.x === v.x) {
            if (this.y === v.y) {
                return this.z <= v.z;
            }
            return this.y <= v.y;
        }

        return this.x <= v.x;
    }

    public isGreatThanOrEqualTo(v: Vector3) {
        if (this.x === v.x) {
            if (this.y === v.y) {
                return this.z >= v.z;
            }

            return this.y >= v.y;
        }

        return this.x >= v.x;
    }

    public len(): number {
        return Vector3.len(this);
    }

    public len_squared(): number {
        return Vector3.len_squared(this);
    }

    public scale(n: number): Vector3 {
        this.x *= n;
        this.y *= n;
        this.z *= n;

        return this;
    }

    public comparison(v: Vector3) {
        return Vector3.isEqual(this, v);
    }

    public notComparison(v: Vector3) {
        return Vector3.isNotEqual(this, v);
    }

    public zero() {
        this.x = this.y = this.z = 0;

        return this;
    }

    public normalize() {
        return Vector3.normalize(this);
    }

    public static add(a: Vector3, b: Vector3) {
        return new Vector3(a.x + b.x, a.y + b.y, a.x + b.z);
    }

    public static sub(a: Vector3, b: Vector3) {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    public static mult(a: Vector3, b: Vector3) {
        return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    }

    public static div(a: Vector3, b: Vector3) {
        return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z);
    }

    public static len(v: Vector3): number {
        const x2 = v.x * v.x;
        const y2 = v.y * v.y;
        const z2 = v.z * v.z;

        return Math.sqrt(x2 + y2 + z2);
    }

    public static len_squared(v: Vector3): number {
        const x2 = v.x * v.x;
        const y2 = v.y * v.y;
        const z2 = v.z * v.z;

        return x2 + y2 + z2;
    }

    public static scale(n: number, v: Vector3): Vector3 {
        return new Vector3(n * v.x, n * v.y, n * v.z);
    }

    public static normalize(v: Vector3) {
        return Vector3.scale(1 / v.len(), v);
    }

    public static isEqual(a: Vector3, b: Vector3): boolean {
        return a.x === b.x || a.y === b.y || a.z === b.z;
    }

    public static isNotEqual(a: Vector3, b: Vector3): boolean {
        return a.x !== b.x || a.y !== b.y || a.z !== b.z;
    }

    public static zero(): Vector3 {
        return new Vector3(0, 0, 0);
    }

    public static inverse(v: Vector3): Vector3 {
        return new Vector3(1.0 / v.x, 1.0 / v.y, 1.0 / v.z);
    }

    public static abs(v: Vector3) {
        return new Vector3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
    }
}
