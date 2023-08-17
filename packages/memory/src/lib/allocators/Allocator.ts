import { TYPED_ARRAY } from '../types/DataType';

export default interface Allocator {
    get byteSize(): number;
    get usedMemory(): number;
    get numAllocations(): number;

    malloc(size: number, alignment: number): DataView;
    deallocate(dataView: TYPED_ARRAY): void;
}
