import { GL_VERTEX_ATTRIBUTE_FORMAT } from '../../index';
import {
    GL_DATA_BYTE,
    GL_DATA_FLOAT,
    GL_DATA_INT,
    GL_DATA_SHORT,
    GL_DATA_UNSIGNED_BYTE,
    GL_DATA_UNSIGNED_INT,
    GL_DATA_UNSIGNED_SHORT,
} from '../webgl.consts';

export enum VertexAttribute {
    Position = '_A_POSITION',
    Normal = '_A_NORMALS',
    Tangent = '',
    Color = '',
    TexCoord0 = '',
    TexCoord1 = '',
    TexCoord2 = '',
    TexCoord3 = '',
    TexCoord4 = '',
    TexCoord5 = '',
    TexCoord6 = '',
    TexCoord7 = '',
    BlendWeight = '',
    BlendIndices = '',
}

export enum VertexAttributeFormat {
    Int8 = GL_DATA_BYTE,
    Int16 = GL_DATA_SHORT,
    Int32 = GL_DATA_INT,
    Uint8 = GL_DATA_UNSIGNED_BYTE,
    Uint16 = GL_DATA_UNSIGNED_SHORT,
    Uint32 = GL_DATA_UNSIGNED_INT,
    Float32 = GL_DATA_FLOAT,
}

export const VertexAttributeFormatByteSize = {
    [VertexAttributeFormat.Int8]: 1,
    [VertexAttributeFormat.Int16]: 2,
    [VertexAttributeFormat.Int32]: 4,
    [VertexAttributeFormat.Uint8]: 1,
    [VertexAttributeFormat.Uint16]: 2,
    [VertexAttributeFormat.Uint32]: 4,
    [VertexAttributeFormat.Float32]: 4,
};

export default class VertexAttributeDescriptor {
    private constructor(
        public readonly attribute: string,
        public readonly byteSize: GL_VERTEX_ATTRIBUTE_FORMAT,
        public readonly dimension: 1 | 2 | 3 | 4 = 3,
        public readonly offset: number
    ) {}

    static makeList(...args: [string, GL_VERTEX_ATTRIBUTE_FORMAT, 1 | 2 | 3 | 4][]): VertexAttributeDescriptor[] {
        const list: VertexAttributeDescriptor[] = [];

        let offset = 0;

        for (const arg of args) {
            list.push(new VertexAttributeDescriptor(arg[0], arg[1], arg[2], offset));
            offset += arg[2] * VertexAttributeFormatByteSize[arg[1]];
        }

        return list;
    }
}
