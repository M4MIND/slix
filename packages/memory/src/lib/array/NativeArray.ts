import { ALLOCATOR } from '../types/DataType';

export interface NativeArray {
    ALLOCATOR: ALLOCATOR;
    destroy(): void;
}
export interface NativeArrayConstructor {
    new <T>(size: number): T;
    new <T>(data: number[]): T;
    new <T>(sizeOrData: number | number[], type: ALLOCATOR): T;
}

declare let NativeArray: NativeArrayConstructor;
