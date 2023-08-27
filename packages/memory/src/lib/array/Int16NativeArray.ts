import { MemoryServer, NativeArrayHelper } from '../../index';
import { symbolDefaultAllocator } from '../MemoryServer';
import { NativeArray } from './NativeArray';

export default class Int16NativeArray extends Int16Array implements NativeArray {
    public readonly allocator: string;
    constructor(sizeOrData: number | number[], allocator = symbolDefaultAllocator) {
        const dataView = MemoryServer.malloc(
            allocator,
            NativeArrayHelper.needBytes(sizeOrData, Int16Array.BYTES_PER_ELEMENT),
            Int16Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Int16Array.BYTES_PER_ELEMENT)
        );

        this.allocator = allocator;
        MemoryServer.gcRegister(this);

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        MemoryServer.deallocate(this);
    }
}
