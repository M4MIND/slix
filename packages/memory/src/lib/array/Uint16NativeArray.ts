import { MemoryServer, NativeArrayHelper } from '../../index';
import { symbolDefaultAllocator } from '../MemoryServer';
import { ALLOCATOR } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Uint16NativeArray extends Uint16Array implements NativeArray {
    public readonly allocator: string;
    constructor(sizeOrData: number | number[], type = symbolDefaultAllocator) {
        const dataView = MemoryServer.malloc(
            type,
            NativeArrayHelper.needBytes(sizeOrData, Uint16Array.BYTES_PER_ELEMENT),
            Uint16Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Uint16Array.BYTES_PER_ELEMENT)
        );

        this.allocator = type;
        MemoryServer.gcRegister(this);

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        MemoryServer.deallocate(this);
    }
}
