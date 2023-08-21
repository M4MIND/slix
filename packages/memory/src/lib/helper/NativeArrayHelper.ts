import { MemoryServer, TYPED_ARRAY } from '../../index';
import { TypeAllocator } from '../types/DataType';

export default class NativeArrayHelper {
    static merge(a: TYPED_ARRAY, step: number, b: TYPED_ARRAY[], offset = 0) {
        const len = b.length;
        for (let i = 0; i < len; i++) {
            a.set(b[i], step * i + offset);
        }

        return this;
    }

    static mergeCollection(_out: TYPED_ARRAY, _in: [TYPED_ARRAY, number][], step: number) {}

    static destroy(allocator: TypeAllocator, byteOffset: number) {
        MemoryServer.deallocate(allocator, byteOffset);
    }

    static malloc(allocator: TypeAllocator, byteSize: number, alignment: number): DataView {
        return MemoryServer.malloc(allocator, byteSize, alignment);
    }

    static needBytes(sizeOrData: number | number[], BYTES_PER_ELEMENT: number) {
        return typeof sizeOrData === 'object' ? sizeOrData.length * BYTES_PER_ELEMENT : sizeOrData * BYTES_PER_ELEMENT;
    }

    static needLength(dataView: DataView, BYTES_PER_ELEMENT: number) {
        return dataView.byteLength / BYTES_PER_ELEMENT;
    }
}
