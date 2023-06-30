import {GL_MATH_TYPES} from "../webgl.consts";

export default class UniformBaseDescriptor {
    constructor(
        public readonly index: number,
        public readonly name: string,
        public readonly type: number,
        public readonly size: number,
    ) {}
}
