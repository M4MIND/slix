type components = [number, number, number]

export default class Vector3 {
    private _components: components = [0, 0, 0];

    public get components(): components {
        return this._components;
    }

    public get x(): number {
        return this._components[0];
    }

    public get y(): number {
        return this._components[1];
    }

    public get z(): number {
        return this._components[2];
    }

    public set x(x: number) {
        this.components[0] = x;
    }

    public set y(y: number) {
        this.components[1] = y;
    }

    public set z(z: number) {
        this.components[2] = z;
    }

    constructor(...args: components) {
        this._components = args;
    }

    public add(v: Vector3): Vector3 {
        return Vector3.add(this, v);
    }

    public sub(v: Vector3): Vector3 {
        return Vector3.sub(this, v);
    }

    public len(): number {
        return Vector3.len(this);
    }

    public scale(n: number, v: Vector3): Vector3 {
        return Vector3.scale(n, v);
    }

    public normalize() {
        return Vector3.normalize(this);
    }

    public static add(a: Vector3, b: Vector3) {
        return new Vector3(
            a.x + b.x,
            a.y + b.y,
            a.z + b.z,
        )
    }

    public static sub(a: Vector3, b: Vector3) {
        return new Vector3(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z,
        )
    }

    public static len(v: Vector3): number {
        return Math.hypot(...v.components)
    }

    public static scale(n: number, v: Vector3): Vector3 {
        return new Vector3(
            n * v.x,
            n * v.y,
            n * v.z,
        )
    }

    public static normalize(v: Vector3) {
        return Vector3.scale(1 / v.len(), v);
    }
}

new Vector3(2, 3, 4);