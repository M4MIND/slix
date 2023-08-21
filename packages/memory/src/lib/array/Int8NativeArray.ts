import NativeArrayHelper from '../helper/NativeArrayHelper';
import { TypeAllocator } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Int8NativeArray extends Int8Array implements NativeArray {
    public readonly allocator: TypeAllocator;
    public readonly dataView: DataView;
    constructor(sizeOrData: number | number[], type: TypeAllocator = TypeAllocator.FREE_LIST) {
        const dataView = NativeArrayHelper.malloc(
            type,
            NativeArrayHelper.needBytes(sizeOrData, Int8Array.BYTES_PER_ELEMENT),
            Int8Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Int8Array.BYTES_PER_ELEMENT)
        );

        this.allocator = type;
        this.dataView = dataView;

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        NativeArrayHelper.destroy(this.allocator, this.byteOffset);
    }
}
