import { TypeAllocator } from '../types/DataType';

export interface NativeArray {
    ALLOCATOR: TypeAllocator;
    dataView: DataView;
    destroy(): void;
}
export interface NativeArrayConstructor {
    new <T>(size: number): T;
    new <T>(data: number[]): T;
    new <T>(sizeOrData: number | number[], type: TypeAllocator): T;
}

declare let NativeArray: NativeArrayConstructor;
