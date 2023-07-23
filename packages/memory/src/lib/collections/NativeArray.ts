import BaseAllocator from '../allocation/BaseAllocator';
import { TypedArray } from '../memory.consts';
import { MemoryServer } from '../../index';
import { TypeAllocators } from '../MemoryServer';

export default class NativeArray {
    protected dataView: DataView;
    protected allocator: BaseAllocator;

    constructor(protected readonly byteSize: number, allocator: TypeAllocators = TypeAllocators.LINEAR) {
        this.allocator = MemoryServer.getAllocator(allocator);
        const dataView = this.allocator.alloc(byteSize);

        if (dataView) {
            this.dataView = dataView;
        } else {
            throw new Error(`Can't make alloc`);
        }
    }

    public getSubArray<S extends TypedArray>(
        classType: new (arrayBuffer: ArrayBuffer, byteOffset: number, byteSize: number) => S,
        byteOffset: number,
        length: number
    ): S {
        return new classType(this.allocator.arrayBuffer, this.dataView.byteOffset + byteOffset, length);
    }

    public setData<S extends TypedArray>(
        data: Array<number>,
        classType: new (arrayBuffer: ArrayBuffer, byteOffset: number, byteSize: number) => S,
        length: number,
        byteOffset = 0,
    ): this {
        new classType(this.allocator.arrayBuffer, this.dataView.byteOffset + byteOffset, length).set(data);

        return this;
    }

    getFloat32Array(byteOffset: number, length: number): Float32Array {
        return this.getSubArray<Float32Array>(Float32Array, byteOffset, length);
    }

    getInt16Array(byteOffset: number, length: number): Int16Array {
        return this.getSubArray<Int16Array>(Int16Array, byteOffset, length);
    }

    getInt32Array(byteOffset: number, length: number): Int32Array {
        return this.getSubArray<Int32Array>(Int32Array, byteOffset, length);
    }

    getInt8Array(byteOffset: number, length: number): Int8Array {
        return this.getSubArray<Int8Array>(Int8Array, byteOffset, length);
    }

    getUint16Array(byteOffset: number, length: number): Uint16Array {
        return this.getSubArray(Uint16Array, byteOffset, length);
    }

    getUint32Array(byteOffset: number, length: number): Uint32Array {
        return this.getSubArray<Uint32Array>(Uint32Array, byteOffset, length);
    }

    getUint8Array(byteOffset: number, length: number): Uint8Array {
        return this.getSubArray<Uint8Array>(Uint8Array, byteOffset, length);
    }

    public setDataUint8(data: Array<number>, byteOffset: number, length: number): NativeArray {
        this.setData<Uint8Array>(data, Uint8Array, byteOffset, length);

        return this;
    }

    public setDataUint16(data: Array<number>, byteOffset: number, length: number): NativeArray {
        this.setData<Uint16Array>(data, Uint16Array, byteOffset, length);

        return this;
    }

    public setDataUint32(data: Array<number>, byteOffset: number, length: number): NativeArray {
        this.setData<Uint32Array>(data, Uint32Array, byteOffset, length);

        return this;
    }

    public setDataInt8(data: Array<number>, byteOffset: number, length: number): NativeArray {
        this.setData<Int8Array>(data, Int8Array, byteOffset, length);

        return this;
    }

    public setDataInt16(data: Array<number>, byteOffset: number, length: number): NativeArray {
        this.setData<Int16Array>(data, Int16Array, byteOffset, length);

        return this;
    }

    public setDataInt32(data: Array<number>, byteOffset: number, length: number): NativeArray {
        this.setData<Int32Array>(data, Int32Array, byteOffset, length);

        return this;
    }

    public setDataFloat32(data: Array<number>, byteOffset: number, length: number): NativeArray {
        this.setData<Float32Array>(data, Float32Array, byteOffset, length);

        return this;
    }

    public dispose() {
        this.allocator.dealloc(this.dataView);
    }
}
