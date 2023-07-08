import BoundaryTagAllocator from './allocation/BoundaryTagAllocator';
import { LinearAllocation } from 'memory';

export default class MemoryServer {
    private static _BoundaryTagAllocator: BoundaryTagAllocator;
    private static _LinearAllocation: LinearAllocation;

    static get LinearAllocation(): LinearAllocation {
        return this._LinearAllocation;
    }

    static get BoundaryTagAllocator(): BoundaryTagAllocator {
        return this._BoundaryTagAllocator;
    }

    public static startUp() {
        this._LinearAllocation = new LinearAllocation(128);
        this._BoundaryTagAllocator = new BoundaryTagAllocator();

        return MemoryServer;
    }
}
