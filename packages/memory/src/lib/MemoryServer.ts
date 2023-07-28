import FreeListAllocator from './allocators/FreeListAllocator';
import LinearAllocator from './allocators/LinearAllocator';
import StackAllocator from './allocators/StackAllocator';

export default class MemoryServer {
    public static freeListAllocator: FreeListAllocator;
    public static linearAllocator: LinearAllocator;
    public static stackAllocator: StackAllocator;
    private static arrayBuffer: ArrayBuffer;
    static startUp(mbSize: number) {
        this.linearAllocator = this.linearAllocator ?? new LinearAllocator();
        this.stackAllocator = this.stackAllocator ?? new StackAllocator();
    }
}
