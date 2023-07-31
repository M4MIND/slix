import FreeListAllocator from './allocators/FreeListAllocator';
import LinearAllocator from './allocators/LinearAllocator';
import StackAllocator from './allocators/StackAllocator';

export default class MemoryServer {
    public static freeListAllocator: FreeListAllocator;
    public static linearAllocator: LinearAllocator;
    public static stackAllocator: StackAllocator;
    private static arrayBuffer: ArrayBuffer;
    static startUp(params: { linearAllocatorByteSize: number; stackAllocatorByteSize: number }) {
        this.linearAllocator = this.linearAllocator ?? new LinearAllocator(params.linearAllocatorByteSize);
        this.stackAllocator = this.stackAllocator ?? new StackAllocator();
    }
}
