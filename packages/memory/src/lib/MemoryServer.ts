import Allocator from './allocators/Allocator';
import FreeListAllocator from './allocators/FreeListAllocator';
import LinearAllocator from './allocators/LinearAllocator';
import StackAllocator from './allocators/StackAllocator';
import { ALLOCATOR } from './types/DataType';

export default class MemoryServer {
    private static _freeListAllocator: FreeListAllocator;
    private static _linearAllocator: LinearAllocator;
    private static _stackAllocator: StackAllocator;

    static get stackAllocator(): StackAllocator {
        return this._stackAllocator;
    }
    static get freeListAllocator(): FreeListAllocator {
        return this._freeListAllocator;
    }
    static get linearAllocator(): LinearAllocator {
        return this._linearAllocator;
    }

    static startUp(params: MemoryServerInitConfigs) {
        this._linearAllocator = this._linearAllocator ?? new LinearAllocator(params.linearAllocatorByteSize);
        this._stackAllocator = this._stackAllocator ?? new StackAllocator();
    }

    static getAllocator(type: ALLOCATOR): Allocator {
        if (type === ALLOCATOR.LINEAR) return this.linearAllocator;

        throw new Error(`Can't find Allocator`);
    }
}

export type MemoryServerInitConfigs = { linearAllocatorByteSize: number; stackAllocatorByteSize: number };
