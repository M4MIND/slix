import { AllocatorHelper, MemoryServer, NativeArrayHelper, TypeAllocator } from '../../index';
import { NativeArray } from './NativeArray';

export default class Float32NativeArray extends Float32Array implements NativeArray {
    public readonly allocator: string;
    constructor(sizeOrData: number | number[], allocator = 'DEFAULT') {
        const dataView = MemoryServer.malloc(
            allocator,
            NativeArrayHelper.needBytes(sizeOrData, Float32Array.BYTES_PER_ELEMENT),
            Float32Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Float32Array.BYTES_PER_ELEMENT)
        );

        this.allocator = allocator;
        MemoryServer.gcRegister(this);
        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        MemoryServer.deallocate(this);
    }
}
