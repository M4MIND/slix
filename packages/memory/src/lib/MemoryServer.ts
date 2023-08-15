import Allocator from './allocators/Allocator';
import FreeListAllocator from './allocators/FreeListAllocator';
import LinearAllocator from './allocators/LinearAllocator';
import StackAllocator from './allocators/StackAllocator';
import { ALLOCATOR, TYPED_ARRAY } from './types/DataType';

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
        this._linearAllocator =
            this._linearAllocator ?? new LinearAllocator(params.linearAllocatorByteSize ?? 64 * 1024 * 1024);
        this._stackAllocator =
            this._stackAllocator ?? new StackAllocator(params.stackAllocatorByteSize ?? 64 * 1024 * 1024);
        this._freeListAllocator =
            this._freeListAllocator ?? new FreeListAllocator(params.freeListAllocatorByteSize ?? 64 * 1024 * 1024);
    }

    static getAllocator(type: ALLOCATOR): Allocator {
        if (type === ALLOCATOR.LINEAR) return this._linearAllocator;
        if (type === ALLOCATOR.FREE_LIST) return this._freeListAllocator;

        throw new Error(`Can't find Allocator`);
    }

    static destroyNativeArray(type: ALLOCATOR, nativeArray: TYPED_ARRAY) {
        this.getAllocator(type).deallocate(nativeArray);
    }

    static malloc(type: ALLOCATOR, byteSize: number, alignment: number): DataView {
        return this.getAllocator(type).malloc(byteSize, alignment);
    }
}

export type MemoryServerInitConfigs = {
    linearAllocatorByteSize?: number;
    stackAllocatorByteSize?: number;
    freeListAllocatorByteSize?: number;
};
