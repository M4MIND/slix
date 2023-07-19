export default class Vector extends Array<number> {
    protected constructor(...args: number[]) {
        super(...args);
    }

    add(v: Vector): this {
        for (const k in this) {
            this[k] += v[k] ?? 0;
        }

        return this;
    }

    sub(v: Vector): this {
        for (const k in this) {
            this[k] -= v[k] ?? 0;
        }

        return this;
    }

    mult(v: Vector): this {
        for (const k in this) {
            this[k] *= v[k] ?? 0;
        }

        return this;
    }

    div(v: Vector): this {
        for (const k in this) {
            this[k] /= v[k] ?? 0;
        }

        return this;
    }

    scale(n: number): this {
        for (const k in this) {
            this[k] *= n;
        }

        return this;
    }

    copy(v: Vector): this {
        for (const k in this) {
            this[k] = v[k] ?? 0;
        }

        return this;
    }

    lenSquared(): number {
        let n = 0;

        for (const v of this) {
            n += v * v;
        }

        return n;
    }

    len(): number {
        return Math.sqrt(this.lenSquared());
    }

    normalize(): this {
        const lengthSqr = this.lenSquared();

        if (!lengthSqr) {
            return this.zero();
        }

        const len = Math.sqrt(lengthSqr);

        for (const k in this) {
            this[k] /= len;
        }

        return this;
    }

    zero(): this {
        this.fill(0);

        return this;
    }

    static lenSquared(v: Vector) {
        let n = 0;

        for (const k in v) {
            n += v[k] * v[k];
        }

        return n;
    }

    static len(v: Vector) {
        return Math.sqrt(this.lenSquared(v));
    }
}
