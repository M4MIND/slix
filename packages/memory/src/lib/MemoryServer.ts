import BoundaryTagAllocator from './allocation/BoundaryTagAllocator';
import { LinearAllocation } from '../index';
import BaseAllocator from './allocation/BaseAllocator';

export enum TypeAllocators {
    LINEAR,
    BOUNDARY
}

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
        this._LinearAllocation = new LinearAllocation(new ArrayBuffer(64 * 1024 * 1024));
        this._BoundaryTagAllocator = new BoundaryTagAllocator(new ArrayBuffer(64 * 1024 * 1024));

        return MemoryServer;
    }

    public static getAllocator(type: TypeAllocators): BaseAllocator {
        if (type === TypeAllocators.BOUNDARY) {
            return this.BoundaryTagAllocator;
        }

        if (type === TypeAllocators.LINEAR) {
            return this.LinearAllocation;
        }

        return this.LinearAllocation;
    }
}
