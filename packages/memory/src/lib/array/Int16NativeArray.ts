import { NativeArrayHelper } from '../../index';
import { ALLOCATOR } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Int16NativeArray extends Int16Array implements NativeArray {
    public readonly ALLOCATOR: ALLOCATOR;
    protected readonly dataView: DataView;
    constructor(sizeOrData: number | number[], type: ALLOCATOR = ALLOCATOR.LINEAR) {
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

        this.ALLOCATOR = type;
        this.dataView = dataView;

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        NativeArrayHelper.destroy(this.ALLOCATOR, this);
    }
}
