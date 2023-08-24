import { TypeAllocator } from '../types/DataType';

export interface NativeArray {
    readonly allocator: string;
    readonly byteOffset: number;
    readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBufferLike;
    readonly byteLength: number;
    destroy(): void;
}
export interface NativeArrayConstructor extends NativeArray {
    new <T>(size: number): T;
    new <T>(data: number[]): T;
    new <T>(sizeOrData: number | number[], type: TypeAllocator): T;
    readonly BYTES_PER_ELEMENT: number;
}

declare let NativeArray: NativeArrayConstructor;
