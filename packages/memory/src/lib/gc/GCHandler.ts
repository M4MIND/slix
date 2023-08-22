import { MemoryServer, TypeAllocator } from '../../index';
import { NativeArray } from '../array/NativeArray';
import { LoggedMethod, LoggerManager } from 'logger';

declare let FinalizationRegistry: {
    new (handler: (k: { allocator: string | symbol; byteOffset: number; token: symbol }) => void): never;
    register(target: NativeArray, heldValue: { allocator: string; byteOffset: number }): void;
    unregister(token: symbol): boolean;
};
export default class GCHandler {
    private finalizationRegistry: typeof FinalizationRegistry;

    constructor() {
        this.finalizationRegistry = new FinalizationRegistry((k) => {
            MemoryServer.gcDeallocate(k.allocator, k.byteOffset);
        });
    }

    register(target: NativeArray): symbol {
        this.finalizationRegistry.register(target, {
            allocator: target.allocator,
            byteOffset: target.dataView.byteOffset,
        });
        return Symbol(self.crypto.randomUUID());
    }

    unregister(token: symbol) {
        this.finalizationRegistry.unregister(token);
    }
}
