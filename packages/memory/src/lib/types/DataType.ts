import { TYPED_ARRAY_CONSTRUCTOR } from '../allocators/Allocator';

export abstract class DataType {
    public static readonly byteSize: number;
    public static readonly dataViewConstructor: TYPED_ARRAY_CONSTRUCTOR;
}

export class FLOAT32 extends DataType {
    static override byteSize = 4;
    static override dataViewConstructor: Float32ArrayConstructor = Float32Array;
}

export class INT16 extends DataType {
    static override byteSize = 2;
    static override dataViewConstructor: Int16ArrayConstructor = Int16Array;
}

export class INT32 extends DataType {
    static override byteSize = 4;
    static override dataViewConstructor: Int32ArrayConstructor = Int32Array;
}

export class INT8 extends DataType {
    static override byteSize = 1;
    static override dataViewConstructor: Int8ArrayConstructor = Int8Array;
}

export class UINT16 extends DataType {
    static override byteSize = 2;
    static override dataViewConstructor: Uint16ArrayConstructor = Uint16Array;
}

export class UINT32 extends DataType {
    static override byteSize = 4;
    static override dataViewConstructor: Uint32ArrayConstructor = Uint32Array;
}

export class UINT8 extends DataType {
    static override byteSize = 1;
    static override dataViewConstructor: Uint8ArrayConstructor = Uint8Array;
}

export type DataTypeArguments = FLOAT32 | INT8 | INT16 | INT32 | UINT8 | UINT16 | UINT32 | DataType;

export type DataTypeConstructor<T> = {
    new (): T;
    byteSize: number;
    dataViewConstructor: TYPED_ARRAY_CONSTRUCTOR;
};
