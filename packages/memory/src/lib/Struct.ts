import { TypedArray } from './memory.consts';

export type TypeNameStruct = string;
export type TypeWordSizeStruct = number;
export type TypeByteSizeStruct = number;
export type TypeConstructorStruct = new () => TypedArray;

export type TypeStruct = [TypeNameStruct, TypeWordSizeStruct, TypeByteSizeStruct, TypeConstructorStruct];

export default class Struct {
    public readonly byteSize = 0;
    public readonly struct: {
        [index: TypeNameStruct]: {
            wordSize: TypeWordSizeStruct;
            byteOffset: TypeByteSizeStruct;
            length: TypeByteSizeStruct;
            constructor: TypeConstructorStruct;
        };
    } = {};

    constructor(...args: TypeStruct[]) {
        for (const v of args) {
            this.struct[v[0]] = { wordSize: v[1], byteOffset: this.byteSize, length: v[2], constructor: v[3] };
            this.byteSize += v[2];
        }
    }

    getStruct(k: string) {
        return this.struct[k];
    }

    private static make(
        name: TypeNameStruct,
        wordSize: TypeWordSizeStruct,
        length: TypeByteSizeStruct,
        constructor: TypeConstructorStruct
    ): TypeStruct {
        if (wordSize <= 0 || length <= 0) {
            throw new Error(`WordSize or length <= 0`);
        }
        return [name, wordSize, length, constructor];
    }

    static uint8(name: string, length = 1): TypeStruct {
        return this.make(name, 1, length, Uint8Array);
    }

    static uint16(name: string, length = 1): TypeStruct {
        return this.make(name, 2, length, Uint16Array);
    }

    static uint32(name: string, length = 1): TypeStruct {
        return this.make(name, 4, length, Uint32Array);
    }

    static int8(name: string, length = 1): TypeStruct {
        return this.make(name, 1, length, Int8Array);
    }

    static int16(name: string, length = 1): TypeStruct {
        return this.make(name, 2, length, Int16Array);
    }

    static int32(name: string, length = 1): TypeStruct {
        return this.make(name, 4, length, Int32Array);
    }

    static float32(name: string, length = 1): TypeStruct {
        return this.make(name, 4, length, Float32Array);
    }
}
