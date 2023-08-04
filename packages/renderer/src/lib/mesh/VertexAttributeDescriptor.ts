import {
    GL_DATA_BYTE,
    GL_DATA_FLOAT,
    GL_DATA_INT,
    GL_DATA_SHORT,
    GL_DATA_UNSIGNED_BYTE,
    GL_DATA_UNSIGNED_INT,
    GL_DATA_UNSIGNED_SHORT,
} from '../webgl.consts';

export enum VertexAttributeFormat {
    Int8 = GL_DATA_BYTE,
    Int16 = GL_DATA_SHORT,
    Int32 = GL_DATA_INT,
    Uint8 = GL_DATA_UNSIGNED_BYTE,
    Unit16 = GL_DATA_UNSIGNED_SHORT,
    Uint32 = GL_DATA_UNSIGNED_INT,
    Float32 = GL_DATA_FLOAT,
}

export default class VertexAttributeDescriptor {
    constructor(
        public readonly attribute: string,
        public readonly byteSize: VertexAttributeFormat,
        public readonly dimension: 1 | 2 | 3 | 4 = 3
    ) {}
}
