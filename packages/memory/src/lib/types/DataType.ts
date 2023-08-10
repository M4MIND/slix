export enum ALLOCATOR {
    LINEAR,
    POOL,
}

export type DataTypeConstructor<T> = {
    new (): T;
    byteSize: number;
    dataViewConstructor: TYPED_ARRAY_CONSTRUCTOR;
};

export type TYPED_ARRAY = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array;

export type TYPED_ARRAY_CONSTRUCTOR =
    | Uint8ArrayConstructor
    | Uint16ArrayConstructor
    | Uint32ArrayConstructor
    | Int8ArrayConstructor
    | Int16ArrayConstructor
    | Int32ArrayConstructor
    | Float32ArrayConstructor;
