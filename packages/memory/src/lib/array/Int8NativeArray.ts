import { MemoryServer } from '../../index';
import NativeArrayHelper from '../helper/NativeArrayHelper';
import { TypeAllocator } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Int8NativeArray extends Int8Array implements NativeArray {
    public readonly allocator: string;
    constructor(sizeOrData: number | number[], allocator = 'DEFAULT') {
        const dataView = MemoryServer.malloc(
            allocator,
            NativeArrayHelper.needBytes(sizeOrData, Int8Array.BYTES_PER_ELEMENT),
            Int8Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Int8Array.BYTES_PER_ELEMENT)
        );

        this.allocator = allocator;
        MemoryServer.gcRegister(this);
        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        MemoryServer.deallocate(this);
    }
}
