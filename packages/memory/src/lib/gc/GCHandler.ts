import { MemoryServer, TypeAllocator } from '../../index';
import { NativeArray } from '../array/NativeArray';
import { LoggedMethod, LoggerManager } from 'logger';

declare let FinalizationRegistry: {
    new (handler: (k: { allocator: string | symbol; byteOffset: number }) => void): never;
    register(target: NativeArray, heldValue: { allocator: string; byteOffset: number }, token: NativeArray): void;
    unregister(token: NativeArray): boolean;
};
export default class GCHandler {
    private finalizationRegistry: typeof FinalizationRegistry;

    constructor() {
        this.finalizationRegistry = new FinalizationRegistry((k) => {
            MemoryServer.gcDeallocate(k.allocator, k.byteOffset);
        });
    }

    register(target: NativeArray): symbol {
        const token = Symbol(self.crypto.randomUUID());
        this.finalizationRegistry.register(
            target,
            {
                allocator: target.allocator,
                byteOffset: target.dataView.byteOffset,
            },
            target
        );
        return token;
    }

    unregister(token: NativeArray) {
        this.finalizationRegistry.unregister(token);
    }
}
