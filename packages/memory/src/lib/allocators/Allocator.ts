import AllocatorHelper from '../helper/AllocatorHelper';
import { TYPED_ARRAY } from '../types/DataType';

export default abstract class Allocator {
    abstract get byteSize(): number;

    abstract get usedMemory(): number;

    abstract get numAllocations(): number;

    protected alignForwardAdjustment(address: number, alignment: number): number {
        return AllocatorHelper.alignForwardAdjustment(address, alignment);
    }

    protected alignForwardAdjustmentWithHeader(address: number, alignment: number, headerSize: number): number {
        return AllocatorHelper.alignForwardAdjustmentWithHeader(address, alignment, headerSize);
    }

    protected checkSize(size: number) {
        if (size <= 0) throw new Error(`Can't free ${size}`);
    }

    abstract malloc(size: number, alignment: number): DataView;
    abstract deallocate(dataView: TYPED_ARRAY): void;
}
