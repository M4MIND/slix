import { TYPED_ARRAY, TypeAllocator } from '../types/DataType';

export default interface Allocator {
    typeAllocator: TypeAllocator;
    get byteSize(): number;
    get usedMemory(): number;
    get numAllocations(): number;

    malloc(size: number, alignment: number): DataView;
    deallocate(byteOffset: number): void;
}
