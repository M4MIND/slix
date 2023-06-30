export default abstract class BaseAllocation {
    public constructor(protected readonly arrayBuffer: ArrayBuffer, protected readonly WORD_SIZE: number) {}

    public abstract allocation(byteSize: number): void;

    protected align(n: number) {
        return ((((n) - 1) >> 2) << 2) + this.WORD_SIZE
    }
}
