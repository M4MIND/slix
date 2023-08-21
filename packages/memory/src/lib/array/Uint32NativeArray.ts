import { NativeArrayHelper } from '../../index';
import { TypeAllocator } from '../types/DataType';
import { NativeArray } from './NativeArray';

export default class Uint32NativeArray extends Uint32Array implements NativeArray {
    public readonly allocator: TypeAllocator;
    public readonly dataView: DataView;
    constructor(sizeOrData: number | number[], type: TypeAllocator = TypeAllocator.FREE_LIST) {
        const dataView = NativeArrayHelper.malloc(
            type,
            NativeArrayHelper.needBytes(sizeOrData, Uint32Array.BYTES_PER_ELEMENT),
            Uint32Array.BYTES_PER_ELEMENT
        );

        super(
            dataView.buffer,
            dataView.byteOffset,
            NativeArrayHelper.needLength(dataView, Uint32Array.BYTES_PER_ELEMENT)
        );

        this.allocator = type;
        this.dataView = dataView;

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }

    destroy(): void {
        NativeArrayHelper.destroy(this.allocator, this.byteOffset);
    }
}
