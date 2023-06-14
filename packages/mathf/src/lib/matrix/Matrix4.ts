type components = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
]

export default class Matrix4 {
    private _components: components = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    public get components(): components {
        return this._components;
    }

    public get m0x0() {
        return this.components[0];
    }

    public get m0x1() {
        return this.components[1];
    }

    public get m0x2() {
        return this.components[2];
    }

    public get m0x3() {
        return this.components[3];
    }

    public get m1x0() {
        return this.components[4];
    }

    public get m1x1() {
        return this.components[5];
    }

    public get m1x2() {
        return this.components[6];
    }

    public get m1x3() {
        return this.components[7];
    }

    public get m2x0() {
        return this.components[8];
    }

    public get m2x1() {
        return this.components[9];
    }

    public get m2x2() {
        return this.components[10];
    }

    public get m2x3() {
        return this.components[11];
    }

    public get m3x0() {
        return this.components[12];
    }

    public get m3x1() {
        return this.components[13];
    }

    public get m3x2() {
        return this.components[14];
    }

    public get m3x3() {
        return this.components[15];
    }

    public get row1() {
        return [this.m0x0, this.m0x1, this.m0x2, this.m0x3];
    }

    public get row2() {
        return [this.m1x0, this.m1x1, this.m1x2, this.m1x3];
    }

    public get row3() {
        return [this.m2x0, this.m2x1, this.m2x2, this.m2x3];
    }

    public get row4() {
        return [this.m3x0, this.m3x1, this.m3x2, this.m3x3];
    }

    public get col1() {
        return [this.m0x0, this.m1x0, this.m2x0, this.m3x0];
    }

    public get col2() {
        return [this.m0x1, this.m1x1, this.m2x1, this.m3x1];
    }

    public get col3() {
        return [this.m0x2, this.m1x2, this.m2x2, this.m3x2];
    }

    public get col4() {
        return [this.m0x3, this.m1x3, this.m2x3, this.m3x3];
    }

    constructor(...args: components) {
        this._components = args;
    }
}