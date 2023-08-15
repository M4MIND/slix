import { AllocatorHelper, TYPED_ARRAY_CONSTRUCTOR } from '../../index';

export type StructType = [
    index: string,
    len: number,
    byteSize: number,
    wordSize: number,
    watcher: TYPED_ARRAY_CONSTRUCTOR
];

export default class Struct {
    private readonly struct: {
        [index: string]: {
            offset: number;
            len: number;
            byteSize: number;
            wordSize: number;
            watcher: TYPED_ARRAY_CONSTRUCTOR;
        };
    } = {};
    private constructor(public readonly byteSize: number) {}

    setStruct(
        index: string,
        offset: number,
        len: number,
        byteSize: number,
        wordSize: number,
        watcher: TYPED_ARRAY_CONSTRUCTOR
    ) {
        this.struct[index] = {
            offset: offset,
            len: len,
            byteSize: byteSize,
            wordSize: wordSize,
            watcher: watcher,
        };
    }

    getStruct(index: string) {
        return this.struct[index];
    }

    getAllValues() {
        return Object.values(this.struct);
    }

    getAllKeys() {
        return Object.keys(this.struct);
    }

    static create(...args: StructType[]): Struct {
        const len = args.length;
        let byteSize = 0;
        let byteOffset = 0;

        for (let i = 0; i < len; i++) {
            byteSize += args[i][2] + AllocatorHelper.alignForwardAdjustment(byteSize, args[i][3]);
        }

        const struct = new Struct(byteSize);

        for (let i = 0; i < len; i++) {
            byteOffset += AllocatorHelper.alignForwardAdjustment(byteOffset, args[i][3]);
            struct.setStruct(args[i][0], byteOffset, args[i][1], args[i][2], args[i][3], args[i][4]);
            byteOffset += args[i][2];
        }

        return struct;
    }
    static int8(index: string, len: number): StructType {
        return [index, len, len, 1, Int8Array];
    }
    static int16(index: string, len: number): StructType {
        return [index, len, len * 2, 2, Int16Array];
    }
    static int32(index: string, len: number): StructType {
        return [index, len, len * 4, 4, Int32Array];
    }

    static float32(index: string, len: number): StructType {
        return [index, len, len * 4, 4, Float32Array];
    }

    static uint8(index: string, len: number): StructType {
        return [index, len, len, 1, Uint8Array];
    }

    static uint16(index: string, len: number): StructType {
        return [index, len, len * 2, 2, Uint16Array];
    }

    static uint32(index: string, len: number): StructType {
        return [index, len, len * 4, 4, Uint32Array];
    }
}
