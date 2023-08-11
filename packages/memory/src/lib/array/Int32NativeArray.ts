import { NativeArrayHelper } from '../../index';
import { ALLOCATOR } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Int32NativeArray extends Int32Array implements NativeArray {
    public readonly ALLOCATOR: ALLOCATOR;
    constructor(size: number);
    constructor(data: number[]);
    constructor(sizeOrData: number | number[], type: ALLOCATOR = ALLOCATOR.LINEAR) {
        const dataView = NativeArrayHelper.malloc(
            type,
            NativeArrayHelper.needBytes(sizeOrData, Int32Array.BYTES_PER_ELEMENT),
            Int32Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Int32Array.BYTES_PER_ELEMENT)
        );

        this.ALLOCATOR = type;

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        NativeArrayHelper.destroy(this.ALLOCATOR, this);
    }
}
