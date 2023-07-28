import { DataTypeArguments, DataTypeConstructor } from '../types/DataType';

export type TYPED_ARRAY = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array;

export type TYPED_ARRAY_CONSTRUCTOR =
    | Uint8ArrayConstructor
    | Uint16ArrayConstructor
    | Uint32ArrayConstructor
    | Int8ArrayConstructor
    | Int16ArrayConstructor
    | Int32ArrayConstructor
    | Float32ArrayConstructor;

export default abstract class Allocator {
    abstract get byteSize(): number;

    abstract get usedMemory(): number;

    abstract get numAllocations(): number;

    protected alignForwardAdjustment(address: number, alignment: number): number {
        const adjustment = alignment - (address & (alignment - 1));

        if (adjustment === alignment) return 0;

        return adjustment;
    }

    protected alignForwardAdjustmentWithHeader(address: number, alignment: number, headerSize: number): number {
        let adjustment = this.alignForwardAdjustment(address, alignment);
        let needSpace = headerSize;

        if (adjustment < needSpace) {
            needSpace -= adjustment;
            adjustment += alignment * (needSpace / alignment);

            if (needSpace % alignment > 0) return (adjustment += alignment);
        }

        return adjustment;
    }

    protected checkSize(size: number) {
        if (size <= 0) throw new Error(`Can't free ${size}`);
    }

    abstract malloc(size: number, alignment: number): Uint8Array;

    abstract calloc<T extends TYPED_ARRAY>(length: number, size: DataTypeConstructor<DataTypeArguments>): T;
    abstract deallocate(dataView: TYPED_ARRAY): void;
}
