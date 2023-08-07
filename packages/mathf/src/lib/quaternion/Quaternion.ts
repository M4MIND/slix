import { Matrix4, Vector3 } from 'mathf';
import { Float32NativeArray } from 'memory';

export default class Quaternion extends Float32NativeArray {
    private readonly cache = new Float32NativeArray(9);
    constructor() {
        super([0, 0, 0, 1]);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    get w() {
        return this[3];
    }

    public rotateX(rad: number) {
        rad *= 0.5;

        this.cache.set(this);

        this.cache[4] = Math.sin(rad);
        this.cache[5] = Math.cos(rad);

        this[0] = this.cache[0] * this.cache[5] + this.cache[3] * this.cache[4];
        this[1] = this.cache[1] * this.cache[5] + this.cache[2] * this.cache[4];
        this[2] = this.cache[2] * this.cache[5] - this.cache[1] * this.cache[4];
        this[3] = this.cache[3] * this.cache[5] - this.cache[0] * this.cache[4];

        return this;
    }

    public rotateY(rad: number) {
        rad *= 0.5;

        this.cache.set(this);

        this.cache[4] = Math.sin(rad);
        this.cache[5] = Math.cos(rad);

        this[0] = this.cache[0] * this.cache[5] - this.cache[2] * this.cache[4];
        this[1] = this.cache[1] * this.cache[5] + this.cache[3] * this.cache[4];
        this[2] = this.cache[2] * this.cache[5] + this.cache[0] * this.cache[4];
        this[3] = this.cache[3] * this.cache[5] - this.cache[1] * this.cache[4];

        return this;
    }

    public rotateZ(rad: number) {
        rad *= 0.5;

        this.cache.set(this);

        this.cache[4] = Math.sin(rad);
        this.cache[5] = Math.cos(rad);

        this[0] = this.cache[0] * this.cache[5] + this.cache[1] * this.cache[4];
        this[1] = this.cache[1] * this.cache[5] - this.cache[0] * this.cache[4];
        this[2] = this.cache[2] * this.cache[5] + this.cache[3] * this.cache[4];
        this[3] = this.cache[3] * this.cache[5] - this.cache[2] * this.cache[4];

        return this;
    }

    toMatrix() {
        this.cache[0] = this.x * this.x; // xx;
        this.cache[1] = this.x * this.y; // xy;
        this.cache[2] = this.x * this.z; // xz;
        this.cache[3] = this.x * this.w; // xw;

        this.cache[4] = this.y * this.y; // yy;
        this.cache[5] = this.y * this.z; // yz;
        this.cache[6] = this.y * this.w; // yw;

        this.cache[7] = this.z * this.z; // zz;
        this.cache[8] = this.z * this.w; // zw

        return new Matrix4(
            1 - 2 * (this.cache[4] + this.cache[7]),
            2 * (this.cache[1] - this.cache[8]),
            2 * (this.cache[2] + this.cache[6]),
            0,
            2 * (this.cache[1] + this.cache[8]),
            1 - 2 * (this.cache[0] + this.cache[7]),
            2 * (this.cache[5] - this.cache[3]),
            0,
            2 * (this.cache[2] - this.cache[6]),
            2 * (this.cache[5] + this.cache[3]),
            1 - 2 * (this.cache[0] + this.cache[4]),
            0,
            0,
            0,
            0,
            1
        );
    }

    fromEuler(v: Vector3, order: 'xyz' | 'xzy' | 'yxz' | 'yzx' | 'zxy' | 'zyx' = 'xyz') {
        this.cache[0] = v.x;
        this.cache[1] = v.y;
        this.cache[2] = v.z;

        this.cache[3] = Math.sin(this.cache[0]); // as sx;
        this.cache[4] = Math.cos(this.cache[0]); // as cx;

        this.cache[5] = Math.sin(this.cache[1]); // as sy;
        this.cache[6] = Math.cos(this.cache[1]); // as cy;

        this.cache[7] = Math.sin(this.cache[2]); // as sz;
        this.cache[8] = Math.cos(this.cache[2]); // as cz;

        switch (order) {
            case 'xyz':
                this[0] = this.cache[3] * this.cache[6] * this.cache[8] + this.cache[4] * this.cache[5] * this.cache[7];
                this[1] = this.cache[4] * this.cache[5] * this.cache[8] - this.cache[3] * this.cache[6] * this.cache[7];
                this[2] = this.cache[4] * this.cache[6] * this.cache[7] + this.cache[3] * this.cache[5] * this.cache[8];
                this[3] = this.cache[4] * this.cache[6] * this.cache[8] - this.cache[3] * this.cache[5] * this.cache[7];
                break;

            case 'xzy':
                this[0] = this.cache[3] * this.cache[6] * this.cache[8] - this.cache[4] * this.cache[5] * this.cache[7];
                this[1] = this.cache[4] * this.cache[5] * this.cache[8] - this.cache[3] * this.cache[6] * this.cache[7];
                this[2] = this.cache[4] * this.cache[6] * this.cache[7] + this.cache[3] * this.cache[5] * this.cache[8];
                this[3] = this.cache[4] * this.cache[6] * this.cache[8] + this.cache[3] * this.cache[5] * this.cache[7];
                break;

            case 'yxz':
                this[0] = this.cache[3] * this.cache[6] * this.cache[8] + this.cache[4] * this.cache[5] * this.cache[7];
                this[1] = this.cache[4] * this.cache[5] * this.cache[8] - this.cache[3] * this.cache[6] * this.cache[7];
                this[2] = this.cache[4] * this.cache[6] * this.cache[7] - this.cache[3] * this.cache[5] * this.cache[8];
                this[3] = this.cache[4] * this.cache[6] * this.cache[8] + this.cache[3] * this.cache[5] * this.cache[7];
                break;

            case 'yzx':
                this[0] = this.cache[3] * this.cache[6] * this.cache[8] + this.cache[4] * this.cache[5] * this.cache[7];
                this[1] = this.cache[4] * this.cache[5] * this.cache[8] + this.cache[3] * this.cache[6] * this.cache[7];
                this[2] = this.cache[4] * this.cache[6] * this.cache[7] - this.cache[3] * this.cache[5] * this.cache[8];
                this[3] = this.cache[4] * this.cache[6] * this.cache[8] - this.cache[3] * this.cache[5] * this.cache[7];
                break;

            case 'zxy':
                this[0] = this.cache[3] * this.cache[6] * this.cache[8] - this.cache[4] * this.cache[5] * this.cache[7];
                this[1] = this.cache[4] * this.cache[5] * this.cache[8] + this.cache[3] * this.cache[6] * this.cache[7];
                this[2] = this.cache[4] * this.cache[6] * this.cache[7] + this.cache[3] * this.cache[5] * this.cache[8];
                this[3] = this.cache[4] * this.cache[6] * this.cache[8] - this.cache[3] * this.cache[5] * this.cache[7];
                break;

            case 'zyx':
                this[0] = this.cache[3] * this.cache[6] * this.cache[8] - this.cache[4] * this.cache[5] * this.cache[7];
                this[1] = this.cache[4] * this.cache[5] * this.cache[8] + this.cache[3] * this.cache[6] * this.cache[7];
                this[2] = this.cache[4] * this.cache[6] * this.cache[7] - this.cache[3] * this.cache[5] * this.cache[8];
                this[3] = this.cache[4] * this.cache[6] * this.cache[8] + this.cache[3] * this.cache[5] * this.cache[7];
                break;

            default:
                throw new Error('Unknown angle order ' + order);
        }

        return this;
    }
}
