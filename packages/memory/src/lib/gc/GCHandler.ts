import { MemoryServer, TypeAllocator } from '../../index';
import { NativeArray } from '../array/NativeArray';
import { LoggedMethod, LoggerManager } from 'logger';

declare let FinalizationRegistry: {
    new (handler: (k: { allocator: TypeAllocator; byteOffset: number; token: symbol }) => void): any;
    register(
        target: NativeArray,
        heldValue: { allocator: TypeAllocator; byteOffset: number; token: symbol },
        token: symbol
    ): void;
    unregister(token: symbol): boolean;
};
export default class GCHandler {
    private finalizationRegistry: typeof FinalizationRegistry;

    constructor() {
        this.finalizationRegistry = new FinalizationRegistry((k) => {
            MemoryServer.destroyByByteOffset(k.allocator, k.byteOffset);
            LoggerManager.get('MemoryServer').debug(`${GCHandler.name}::destroy`, k.token.toString());
        });
    }

    register(target: NativeArray): symbol {
        const token = Symbol(self.crypto.randomUUID());
        this.finalizationRegistry.register(
            target,
            {
                allocator: target.ALLOCATOR,
                byteOffset: target.dataView.byteOffset,
                token: token,
            },
            token
        );

        LoggerManager.get('MemoryServer::GC').trace(`${GCHandler.name}::register`, token.toString());
        return token;
    }

    unregister(token: symbol) {
        LoggerManager.get('MemoryServer').trace(`${GCHandler.name}::unregister`, token.toString());
        this.finalizationRegistry.unregister(token);
    }
}
