import { Structure, TypedArray } from '../memory.consts';
import { MemoryServer, NativeArray } from 'memory';

/**
 * NativeStaticArray use for creating arrays in Static memory
 * */
export default class NativeStaticArray extends NativeArray {
    constructor(structure: Structure) {
        super(structure, MemoryServer.LinearAllocation);
    }

    getSubArray<S extends TypedArray>(
        classType: {
            new (arrayBuffer: ArrayBuffer, byteOffset: number, byteSize: number): S;
        },
        bytesOffset: number,
        length: number
    ): S {
        return new classType(this.memory.arrayBuffer, this.dataView.byteOffset + bytesOffset, length);
    }

    setData<S extends TypedArray>(
        data: Array<number>,
        classType: {
            new (arrayBuffer: ArrayBuffer, byteOffset: number, byteSize: number): S;
        },
        byteOffset: number,
        byteSize: number
    ): this {
        new classType(this.memory.arrayBuffer, this.dataView.byteOffset + byteOffset, byteSize).set(data);

        return this;
    }

    protected createDataView(size: number): DataView {
        const dataView = this.memory.alloc(size);
        if (dataView) {
            return this.dataView;
        }
        throw new Error(`Can't alloc memory`);
    }
}
