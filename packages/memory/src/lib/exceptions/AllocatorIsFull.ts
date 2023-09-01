import AllocatorInterface from '../allocators/AllocatorInterface';

export default class AllocatorIsFull extends Error {
    constructor(allocator: AllocatorInterface) {
        super(
            `${allocator.constructor.name}::malloc() => Failed to allocate memory. ${
                allocator.byteSize - allocator.usedMemory
            } bytes available`
        );
    }
}
