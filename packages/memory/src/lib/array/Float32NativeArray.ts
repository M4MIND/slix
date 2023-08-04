import MemoryServer from '../MemoryServer';
import { ALLOCATOR } from '../types/DataType';

export default class Float32NativeArray extends Float32Array {
    constructor(size: number);
    constructor(data: number[]);
    constructor(sizeOrData: number | number[], type: ALLOCATOR = ALLOCATOR.LINEAR) {
        const BYTES_PER_ELEMENT = Float32Array.BYTES_PER_ELEMENT;
        const dataView = MemoryServer.getAllocator(type).malloc(
            typeof sizeOrData === 'object' ? sizeOrData.length * BYTES_PER_ELEMENT : sizeOrData * BYTES_PER_ELEMENT,
            BYTES_PER_ELEMENT
        );
        super(dataView.buffer, dataView.byteOffset, dataView.byteLength / BYTES_PER_ELEMENT);

        if (typeof sizeOrData === 'object') this.set(sizeOrData);
    }
}
