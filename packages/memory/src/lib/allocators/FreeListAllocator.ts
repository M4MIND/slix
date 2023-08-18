import { TYPED_ARRAY } from '../types/DataType';
import Allocator from './Allocator';
import { add } from 'benny';
import { LoggerManager } from 'logger';
import { AllocatorHelper } from 'memory';

enum ALLOCATION_HEADER {
    SIZE = 0,
    ADJUSTMENTS = 4,
    USED = 8,
    HEADER_SIZE = 9,
}

enum ALLOCATION_HEADER_END {
    SIZE = 0,
    ADJUSTMENTS = 4,
    HEADER_SIZE = 5,
}

export default class FreeListAllocator implements Allocator {
    public readonly arrayBuffer: ArrayBuffer;
    public readonly dataView: DataView;
    private _usedMemory = 0;
    private _numAllocations = 0;
    public get byteSize(): number {
        return this.dataView.byteLength;
    }

    public get usedMemory(): number {
        return this._usedMemory;
    }

    private set usedMemory(v: number) {
        this._usedMemory = v;
    }

    public get numAllocations(): number {
        return this._numAllocations;
    }

    private set numAllocations(v: number) {
        this._numAllocations = v;
    }

    constructor(dataView: DataView) {
        this.arrayBuffer = dataView.buffer;
        this.dataView = dataView;
        const ad = AllocatorHelper.alignForwardAdjustmentWithHeader(0, 4, ALLOCATION_HEADER.HEADER_SIZE);
        this.setFreeBlockHeader(
            0,
            dataView.byteLength - ALLOCATION_HEADER.HEADER_SIZE - ALLOCATION_HEADER_END.HEADER_SIZE,
            false,
            ad
        );
        this.setFreeBlockEnd(
            this.dataView.byteLength,
            dataView.byteLength - ALLOCATION_HEADER.HEADER_SIZE - ALLOCATION_HEADER_END.HEADER_SIZE,
            ad
        );
    }

    private setFreeBlockHeader(address: number, byteSize: number, used: boolean, adjustment: number) {
        this.dataView.setUint32(address + ALLOCATION_HEADER.SIZE, byteSize);
        this.dataView.setUint8(address + ALLOCATION_HEADER.USED, used ? 1 : 0);
        this.dataView.setUint32(address + ALLOCATION_HEADER.ADJUSTMENTS, adjustment);

        LoggerManager.get('MemoryServer::ALLOCATORS').debug(
            `${FreeListAllocator.name}::setFreeBlockHeader`,
            `0x${address.toString(16)}`,
            `[${byteSize}][${byteSize}][${byteSize}][${byteSize}][${used}][${adjustment}]`
        );
    }

    private setFreeBlockEnd(address: number, byteSize: number, adjustment: number) {
        LoggerManager.get('MemoryServer::ALLOCATORS').debug(
            `${FreeListAllocator.name}::setFreeBlockEnd`,
            `0x${address.toString(16)}`,
            `[${adjustment}][${byteSize}][${byteSize}][${byteSize}][${byteSize}]`
        );
    }

    deallocate(dataView: TYPED_ARRAY): void {}

    malloc(size: number, alignment: number): DataView {
        LoggerManager.get('MemoryServer::ALLOCATORS').debug(
            `${FreeListAllocator.name}::malloc => byteSize: ${size} | alignment: ${alignment}`
        );

        return new DataView(this.arrayBuffer);
    }
}
