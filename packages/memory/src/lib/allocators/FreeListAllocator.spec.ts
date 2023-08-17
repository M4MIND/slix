import { MemoryServer } from '../../index';
import { TypeAllocator } from '../types/DataType';

describe('FreeList allocator', () => {
    describe('malloc', () => {
        MemoryServer.startUp({});
        expect(MemoryServer.getAllocator(TypeAllocator.FREE_LIST).malloc(32, 4));
    });
});
