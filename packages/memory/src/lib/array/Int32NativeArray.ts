import { MemoryServer, NativeArrayHelper } from '../../index';
import { TypeAllocator } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Int32NativeArray extends Int32Array implements NativeArray {
    public readonly allocator: string;
    constructor(sizeOrData: number | number[], type = 'DEFAULT') {
        const dataView = MemoryServer.malloc(
            type,
            NativeArrayHelper.needBytes(sizeOrData, Int32Array.BYTES_PER_ELEMENT),
            Int32Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Int32Array.BYTES_PER_ELEMENT)
        );

        this.allocator = type;
        MemoryServer.gcRegister(this);

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        MemoryServer.deallocate(this);
    }
}
