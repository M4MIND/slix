import { ALLOCATOR } from '../types/DataType';

export default interface AllocatorInterface {
    typeAllocator: ALLOCATOR;
    get byteSize(): number;
    get usedMemory(): number;
    get numAllocations(): number;

    malloc(size: number, alignment: number): MemoryPointer;
    deallocate(byteOffset: number): void;
    clear(): void;
}

export interface AllocatorConstructor {
    new (memoryPointer: MemoryPointer, ...params: any[]): AllocatorInterface;
}

export type MemoryPointer = {
    buffer: ArrayBuffer;
    byteOffset: number;
    byteLength: number;
};
