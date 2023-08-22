import Allocator, { AllocatorConstructor } from './allocators/Allocator';
import GCHandler from './gc/GCHandler';

const symbolDefaultAllocator = Symbol('DEFAULT');

export default class MemoryServer {
    public static readonly GC: GCHandler = new GCHandler();

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

    static getAllocator(type: string): Allocator {
        if (this.allocators[type]) {
            return this.allocators[type];
        } else {
            return this.allocators[symbolDefaultAllocator];
        }
    }

    static deallocate(type: string, byteOffset: number) {
        this.getAllocator(type).deallocate(byteOffset);
    }

    static malloc(type: string, byteSize: number, alignment: number): DataView {
        return this.getAllocator(type).malloc(byteSize, alignment);
    }
}

export type MemoryServerInitConfigs = {
    name: string;
    root: AllocatorConstructor;
    default: { allocator: AllocatorConstructor; byteSize: number };
    children: { name: string; allocator: AllocatorConstructor; byteSize: number }[];
};
