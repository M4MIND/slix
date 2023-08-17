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
            adjustment += alignment * (needSpace / alignment);

            if (needSpace % alignment > 0) return (adjustment += alignment);
        }

        return adjustment;
    }

    static checkSize(size: number) {
        if (size <= 0) throw new Error(`Can't free ${size}`);
    }
}
