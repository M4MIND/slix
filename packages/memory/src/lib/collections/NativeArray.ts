import BaseAllocator from '../allocation/BaseAllocator';
import { Structure, TypedArray, TypedArrayByteSize, TypedArrayConstructors } from '../memory.consts';

type PrepareStructure = {
    [index: string]: { dataView: DataView; constructor: new () => TypedArray; wordSize: number };
};

export default abstract class NativeArray {
    protected byteSize = 0;
    protected dataView: DataView;
    protected memory: BaseAllocator;
    protected structure: PrepareStructure;

    protected constructor(structure: Structure, allocator: BaseAllocator) {
        this.memory = allocator;
        this.dataView = this.createDataView(this.calculateByteSize(structure));
        this.structure = this.prepareStructure(structure);
    }

    protected calculateByteSize(structure: Structure): number {
        this.byteSize = 0;

        for (const key of Object.keys(structure)) {
            const str = structure[key];
            this.byteSize += str.length * TypedArrayByteSize[str.wordSize];
        }

        return this.byteSize;
    }

    protected prepareStructure(structure: Structure): PrepareStructure {
        const out: PrepareStructure = {};
        let byte = 0;

        for (const key of Object.keys(structure)) {
            const startByte = byte;
            byte += structure[key].length * TypedArrayByteSize[structure[key].wordSize];
            out[key] = {
                dataView: new DataView(this.memory.arrayBuffer, startByte, byte - startByte),
                constructor: TypedArrayConstructors[structure[key].wordSize],
                wordSize: TypedArrayByteSize[structure[key].wordSize],
            };
        }

        return out;
    }

    public abstract getSubArray<S extends TypedArray>(
        classType: new (arrayBuffer: ArrayBuffer, byteOffset: number, byteSize: number) => S,
        byteOffset: number,
        length: number
    ): S;

    public abstract setData<S extends TypedArray>(
        data: Array<number>,
        classType: new (arrayBuffer: ArrayBuffer, byteOffset: number, byteSize: number) => S,
        byteOffset: number,
        byteSize: number
    ): this;

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

    public setDataByStructureName(name: string, data: Array<number>) {
        const structure = this.structure[name];
        this.setData(data, structure.constructor, structure.dataView.byteOffset, structure.dataView.byteLength);
    }

    public getDataByStructureName(name: string): TypedArray {
        const structure = this.structure[name];

        return this.getSubArray(
            structure.constructor,
            structure.dataView.byteOffset,
            structure.dataView.byteLength / structure.wordSize
        );
    }

    public toArray() {
        let array: Array<number> = [];

        for (const k of Object.keys(this.structure)) {
            array = array.concat(...this.getDataByStructureName(k));
        }

        return array;
    }

    public getStructure(name: string) {
        return this.structure[name];
    }

    protected abstract createDataView(size: number): DataView;
}
