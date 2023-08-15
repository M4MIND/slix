import NativeArrayHelper from '../helper/NativeArrayHelper';
import { ALLOCATOR } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Int8NativeArray extends Int8Array implements NativeArray {
    public readonly ALLOCATOR: ALLOCATOR;
    protected readonly dataView: DataView;
    constructor(sizeOrData: number | number[], type: ALLOCATOR = ALLOCATOR.LINEAR) {
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

        this.ALLOCATOR = type;
        this.dataView = dataView;

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        NativeArrayHelper.destroy(this.ALLOCATOR, this);
    }
}
