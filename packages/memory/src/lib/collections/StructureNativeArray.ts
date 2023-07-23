import { TypeAllocators } from '../MemoryServer';
import NativeArray from './NativeArray';
import Struct from './../Struct';

export default class StructureNativeArray extends NativeArray {
    constructor(private readonly struct: Struct, private readonly typeAllocator: TypeAllocators = TypeAllocators.BOUNDARY) {
        super(struct.byteSize, typeAllocator);
    }

    get(key: string) {
        const s = this.struct.getStruct(key)

        return this.getSubArray(
            s.constructor,
            s.byteOffset,
            s.length
        )
    }

    set(key: string, value: number[]) {
        const s = this.struct.getStruct(key);

        this.setData(value, s.constructor, s.length, s.byteOffset);
    }
}
