import { TYPED_ARRAY, TypeAllocator, Uint8NativeArray } from '../../index';
import Struct from './Struct';

export default class StructureNativeArray extends Uint8NativeArray {
    private watchers: { [index: string]: TYPED_ARRAY } = {};
    constructor(private readonly struct: Struct, allocator: TypeAllocator = TypeAllocator.LINEAR) {
        super(struct.byteSize, allocator);

        for (const structKey of this.struct.getAllKeys()) {
            const struct = this.struct.getStruct(structKey);
            this.watchers[structKey] = new struct.watcher(this.buffer, this.byteOffset + struct.offset, struct.len);
        }
    }

    setValue(name: string, index: number, value: number): void {
        const structDescriptor = this.struct.getStruct(name);

        if (index < 0 || index > structDescriptor.len) throw new Error('Error');

        this.watchers[name][index] = value;
    }

    setValues(name: string, values: number[] | TYPED_ARRAY) {
        const structDescriptor = this.struct.getStruct(name);

        if (structDescriptor.len < values.length) throw new Error('Error');

        this.watchers[name].set(values);

        return this;
    }
}
