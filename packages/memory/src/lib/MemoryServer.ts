import { TypeAllocator } from '../index';
import Allocator, { AllocatorConstructor } from './allocators/Allocator';
import { NativeArray } from './array/NativeArray';
import GCHandler from './gc/GCHandler';

export const symbolDefaultAllocator = Symbol('DEFAULT');

export default class MemoryServer {
    private static readonly GC: GCHandler = new GCHandler();
    private static allocators: { [index: string | symbol]: Allocator } = {};
    private static rootAllocator: Allocator;

    static startUp(params: MemoryServerInitConfigs) {
        // Считаем сколько памяти потребуется на все аллокаторы
        const dataView = new DataView(
            new ArrayBuffer(
                params.children.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.byteSize;
                }, 0) + params.default.byteSize
            )
        );

        MemoryServer.rootAllocator = new params.root(dataView);
        MemoryServer.allocators[symbolDefaultAllocator] = new params.default.allocator(
            MemoryServer.rootAllocator.malloc(params.default.byteSize, 1)
        );
        params.children.map((value) => {
            MemoryServer.allocators[value.name] = new value.allocator(
                MemoryServer.rootAllocator.malloc(value.byteSize, 1)
            );
        });
    }

    static getAllocator<T extends Allocator>(type: string | symbol): T {
        if (this.allocators[type]) {
            return this.allocators[type] as T;
        } else {
            return this.allocators[symbolDefaultAllocator] as T;
        }
    }

    static getAllocators() {
        return Object.keys(this.allocators);
    }

    static deallocate(target: NativeArray) {
        this.gcUnregister(target);
        this.getAllocator(target.allocator).deallocate(target.dataView.byteOffset);
    }

    static gcDeallocate(allocator: string | symbol, byteOffset: number) {
        this.getAllocator(allocator).deallocate(byteOffset);
    }

    static malloc(type: string, byteSize: number, alignment: number): DataView {
        return this.getAllocator(type).malloc(byteSize, alignment);
    }

    static gcRegister(target: NativeArray): symbol | null {
        if (this.getAllocator(target.allocator).typeAllocator === TypeAllocator.LINEAR) return null;
        return this.GC.register(target);
    }

    static gcUnregister(target: NativeArray) {
        if (target.token) this.GC.unregister(target);
    }
}

export type MemoryServerInitConfigs = {
    name: string;
    root: AllocatorConstructor;
    default: { allocator: AllocatorConstructor; byteSize: number };
    children: { name: string; allocator: AllocatorConstructor; byteSize: number }[];
};
