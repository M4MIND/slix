import { MemoryServer } from '../../index';
import { ALLOCATOR } from '../types/DataType';

describe('FreeList allocator', () => {
    describe('malloc', () => {
        MemoryServer.startUp({});
        expect(MemoryServer.getAllocator(ALLOCATOR.FREE_LIST).malloc(32, 4));
    });
});
