import { MemoryServer, NativeArrayHelper, TypeAllocator } from '../../index';
import { NativeArray } from './NativeArray';

export default class Float32NativeArray extends Float32Array implements NativeArray {
    public readonly ALLOCATOR: TypeAllocator;
    public readonly dataView: DataView;
    private token: symbol;
    constructor(sizeOrData: number | number[], type: TypeAllocator = TypeAllocator.LINEAR) {
        const dataView = NativeArrayHelper.malloc(
            type,
            NativeArrayHelper.needBytes(sizeOrData, Float32Array.BYTES_PER_ELEMENT),
            Float32Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Float32Array.BYTES_PER_ELEMENT)
        );

        this.ALLOCATOR = type;
        this.dataView = dataView;

        if (typeof sizeOrData === 'object') this.set(sizeOrData);

        this.token = MemoryServer.GC.register(this);
    }

    destroy(): void {
        MemoryServer.GC.unregister(this.token);
        NativeArrayHelper.destroy(this.ALLOCATOR, this);
    }
}
