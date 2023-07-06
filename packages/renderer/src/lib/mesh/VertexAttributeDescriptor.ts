import { TypedArray } from 'memory';

export default class VertexAttributeDescriptor {
    constructor(
        public readonly attribute: string,
        public readonly byteSize: number,
        dimension: number = 3,
        stream: number = 0
    ) {}
}

export enum VertexAttributeFormat {
    Float32 = 4,
    Float16 = 2,
}
