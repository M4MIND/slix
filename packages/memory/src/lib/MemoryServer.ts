import Allocator from './allocators/Allocator';
import FreeListAllocator from './allocators/FreeListAllocator';
import LinearAllocator from './allocators/LinearAllocator';
import StackAllocator from './allocators/StackAllocator';
import GCHandler from './gc/GCHandler';
import { TYPED_ARRAY, TypeAllocator } from './types/DataType';
import { Logger, LoggerManager } from 'logger';

export default class MemoryServer {
    private static _freeListAllocator: FreeListAllocator;
    private static _linearAllocator: LinearAllocator;
    private static _stackAllocator: StackAllocator;
    private static _GC: GCHandler;
    private static _logger: Logger;
    static _rootAllocator: LinearAllocator;

    static get stackAllocator(): StackAllocator {
        return this._stackAllocator;
    }
    static get freeListAllocator(): FreeListAllocator {
        return this._freeListAllocator;
    }
    static get linearAllocator(): LinearAllocator {
        return this._linearAllocator;
    }

    static get logger() {
        return this._logger;
    }

    static get GC() {
        return this._GC;
    }

    static startUp(params: MemoryServerInitConfigs) {
        LoggerManager.register('MemoryServer', 'TRACE');
        this._GC = this._GC ?? new GCHandler();

        this._rootAllocator = this._rootAllocator ?? new LinearAllocator(params.rootAllocator ?? 1024 * 1024 * 1024);
        this._linearAllocator =
            this._linearAllocator ?? new LinearAllocator(params.linearAllocatorByteSize ?? 64 * 1024 * 1024);
        this._stackAllocator =
            this._stackAllocator ?? new StackAllocator(params.stackAllocatorByteSize ?? 64 * 1024 * 1024);
        this._freeListAllocator =
            this._freeListAllocator ?? new FreeListAllocator(params.freeListAllocatorByteSize ?? 64 * 1024 * 1024);

        LoggerManager.get('MemoryServer').info('Init GC');
        LoggerManager.get('MemoryServer').info(`Init LinearAllocator ${this.linearAllocator.byteSize} byte size`);
        LoggerManager.get('MemoryServer').info(`Init StackAllocator ${this.stackAllocator.byteSize} byte size`);
        LoggerManager.get('MemoryServer').info(`Init FreeListAllocator ${this.freeListAllocator.byteSize} byte size`);
    }

    static getAllocator(type: TypeAllocator): Allocator {
        if (type === TypeAllocator.LINEAR) return this._linearAllocator;
        if (type === TypeAllocator.FREE_LIST) return this._freeListAllocator;

        throw new Error(`Can't find Allocator`);
    }

    static destroyNativeArray(type: TypeAllocator, nativeArray: TYPED_ARRAY) {
        if (type === TypeAllocator.LINEAR) return;
        this.getAllocator(type).deallocate(nativeArray);
    }

    static destroyByByteOffset(type: TypeAllocator, byteOffset: number) {}

    static malloc(type: TypeAllocator, byteSize: number, alignment: number): DataView {
        return this.getAllocator(type).malloc(byteSize, alignment);
    }
}

export type MemoryServerInitConfigs = {
    rootAllocator?: number;
    linearAllocatorByteSize?: number;
    stackAllocatorByteSize?: number;
    freeListAllocatorByteSize?: number;
};
