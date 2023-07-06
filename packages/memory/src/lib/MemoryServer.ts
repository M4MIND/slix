import { LinearAllocation, PoolAllocator } from 'memory';

export default class MemoryServer {
    static get LinearAllocation(): LinearAllocation {
        return this._LinearAllocation;
    }

    static get PoolAllocator(): PoolAllocator {
        return this._PoolAllocator;
    }

    private static _LinearAllocation: LinearAllocation;
    private static _PoolAllocator: PoolAllocator;

    public static startUp() {
        this._LinearAllocation = new LinearAllocation(64);
        this._PoolAllocator = new PoolAllocator();

        return MemoryServer;
    }
}
