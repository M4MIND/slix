export enum VertexAttributeFormat {
    Int8 = 1,
    Int16 = 2,
    Int32 = 4,
    Uint8 = 1,
    Unit16 = 2,
    Uint32 = 4,
    Float32 = 4,
}

export default class VertexAttributeDescriptor {
    constructor(
        public readonly attribute: string,
        public readonly byteSize: VertexAttributeFormat,
        public readonly dimension: number,
    ) {
    }
}