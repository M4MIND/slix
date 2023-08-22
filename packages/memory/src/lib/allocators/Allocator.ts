import { TypeAllocator } from '../types/DataType';

export default interface Allocator {
    typeAllocator: TypeAllocator;
    arrayBuffer: ArrayBuffer;
    get byteSize(): number;
    get usedMemory(): number;
    get numAllocations(): number;

    malloc(size: number, alignment: number): DataView;
    deallocate(byteOffset: number): void;
}

export interface AllocatorConstructor {
    new (dataView: DataView): Allocator;
}
