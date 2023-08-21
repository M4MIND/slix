import { NativeArrayHelper } from '../../index';
import { TypeAllocator } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Int16NativeArray extends Int16Array implements NativeArray {
    public readonly allocator: TypeAllocator;
    public readonly dataView: DataView;
    constructor(sizeOrData: number | number[], type: TypeAllocator = TypeAllocator.FREE_LIST) {
        const dataView = NativeArrayHelper.malloc(
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
        NativeArrayHelper.destroy(this.allocator, this.byteOffset);
    }
}
