export default class AllocatorHelper {
    static alignForwardAdjustment(address: number, alignment: number): number {
        const adjustment = alignment - (address & (alignment - 1));
        if (adjustment === alignment) return 0;

        return adjustment;
    }

    static alignForwardAdjustmentWithHeader(address: number, alignment: number, headerSize: number): number {
        let adjustment = this.alignForwardAdjustment(address, alignment);
        let needSpace = headerSize;

        if (adjustment < needSpace) {
            needSpace -= adjustment;
            adjustment += alignment * Math.floor(needSpace / alignment);

            if (needSpace % alignment > 0) adjustment += alignment;
        }

        return adjustment;
    }

    static checkParamsMalloc(size: number, alignment: number) {
        if (size <= 0 || alignment <= 0)
            throw new Error('The size of the block to be allocated or the block tear-out cannot be smaller than 1');
    }
}
