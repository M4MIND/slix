import { MemoryServer, TypeAllocator } from '../../index';
import { NativeArray } from '../array/NativeArray';
import { LoggedMethod, LoggerManager } from 'logger';

declare let FinalizationRegistry: {
    new (handler: (k: { allocator: string; byteOffset: number; token: symbol }) => void): any;
    register(
        target: NativeArray,
        heldValue: { allocator: string; byteOffset: number; token: symbol },
        token: symbol
    ): void;
    unregister(token: symbol): boolean;
};
export default class GCHandler {
    private finalizationRegistry: typeof FinalizationRegistry;

    constructor() {
        this.finalizationRegistry = new FinalizationRegistry((k) => {
            MemoryServer.deallocate(k.allocator, k.byteOffset);
        });
    }

    register(target: NativeArray): symbol {
        const token = Symbol(self.crypto.randomUUID());
        this.finalizationRegistry.register(
            target,
            {
                allocator: target.allocator,
                byteOffset: target.dataView.byteOffset,
                token: token,
            },
            token
        );
        return token;
    }

    unregister(token: symbol) {
        this.finalizationRegistry.unregister(token);
    }
}
