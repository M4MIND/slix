import { Matrix4, Vector2, Vector3 } from 'mathf';

export type TypedArray = Int8Array | Int16Array | Int32Array | Float32Array | Uint8Array | Uint16Array | Uint32Array;

export const TypedArrayByteSize: { [index: string]: number } = {
    Int8Array: Int8Array.BYTES_PER_ELEMENT,
    Int16Array: Int16Array.BYTES_PER_ELEMENT,
    Int32Array: Int32Array.BYTES_PER_ELEMENT,
    Uint8Array: Uint8Array.BYTES_PER_ELEMENT,
    Uint16Array: Uint16Array.BYTES_PER_ELEMENT,
    Uint32Array: Uint32Array.BYTES_PER_ELEMENT,
    Float32Array: Float32Array.BYTES_PER_ELEMENT,
};

export enum TypedArrayKeys {
    Int8Array = 'Int8Array',
    Int16Array = 'Int16Array',
    Int32Array = 'Int32Array',
    Uint8Array = 'Uint8Array',
    Uint16Array = 'Uint16Array',
    Uint32Array = 'Uint32Array',
    Float32Array = 'Float32Array',
}

export const TypedArrayConstructors: { [index: string]: new () => TypedArray } = {
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
};

export enum TypeAllocate {
    Persistent = 0,
    Pool = 1,
}

export type Structure = { [index: string]: { wordSize: TypedArrayKeys; length: number } };
export type InStructure = { [index: string]: Vector3[] | Matrix4[] | Vector2[] | Array<number> };
