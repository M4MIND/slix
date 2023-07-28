import { MemoryServer } from '../../index';
import { TYPED_ARRAY } from '../allocators/Allocator';
import { DataTypeArguments, DataTypeConstructor, UINT8 } from '../types/DataType';

export default class NativeArray {
    [key: number]: number;

    public readonly data: TYPED_ARRAY;
    protected dataType: DataTypeConstructor<DataTypeArguments> = UINT8;
    public readonly length: number;
    private static memoryServer = MemoryServer;

    constructor(data: number);
    constructor(length: number[]);
    constructor(dataOrLength: number | number[]) {
        if (typeof dataOrLength === 'object') {
            this.length = dataOrLength.length;
            this.data = NativeArray.memoryServer.linearAllocator.calloc(dataOrLength.length, this.dataType);
            this.data.set(dataOrLength);

            return;
        }
        this.length = dataOrLength;
        this.data = NativeArray.memoryServer.linearAllocator.calloc(dataOrLength, this.dataType).fill(0);

        // return new Proxy(this, {
        //     get(target: NativeArray, p: string | symbol | number, receiver: any): any {
        //         if (p in target) {
        //             return Reflect.get(target, p, receiver);
        //         }
        //
        //         return target.data[p as number];
        //     },
        //     set(target: NativeArray, p: string | symbol | number, newValue: any, receiver: any): boolean {
        //         if (p in target) {
        //             return Reflect.set(target, p, receiver);
        //         }
        //
        //         target.data[p as number] = newValue as number;
        //
        //         return true;
        //     },
        // });
    }

    public set(index: number, value: number) {
        if (index <= this.length) this.data[index] = value;

        return this;
    }

    public copyFrom(data: number[]): this {
        if (data.length === this.length) this.data.set(data);
        return this;
    }

    public dispose() {
        NativeArray.memoryServer.linearAllocator.deallocate(this.data);
    }
}
