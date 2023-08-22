import { AllocatorHelper, MemoryServer, NativeArrayHelper, TypeAllocator } from '../../index';
import { NativeArray } from './NativeArray';

export default class Float32NativeArray extends Float32Array implements NativeArray {
    public readonly allocator: string;
    public readonly dataView: DataView;
    private token?: symbol;
    constructor(sizeOrData: number | number[], type = 'DEFAULT') {
        const dataView = MemoryServer.malloc(
            type,
            NativeArrayHelper.needBytes(sizeOrData, Float32Array.BYTES_PER_ELEMENT),
            Float32Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Float32Array.BYTES_PER_ELEMENT)
        );

        this.allocator = type;
        this.dataView = dataView;

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
        this.token = MemoryServer.GC.register(this);
    }

    destroy(): void {
        if (this.token) MemoryServer.GC.unregister(this.token);
        MemoryServer.deallocate(this.allocator, this.byteOffset);
    }
}
