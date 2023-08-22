import { MemoryServer, NativeArrayHelper } from '../../index';
import { NativeArray } from './NativeArray';

export default class Int16NativeArray extends Int16Array implements NativeArray {
    public readonly allocator: string;
    public readonly dataView: DataView;
    constructor(sizeOrData: number | number[], type = 'DEFAULT') {
        const dataView = MemoryServer.malloc(
            type,
            NativeArrayHelper.needBytes(sizeOrData, Int16Array.BYTES_PER_ELEMENT),
            Int16Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Int16Array.BYTES_PER_ELEMENT)
        );

        this.allocator = type;
        this.dataView = dataView;

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        MemoryServer.deallocate(this.allocator, this.byteOffset);
    }
}
