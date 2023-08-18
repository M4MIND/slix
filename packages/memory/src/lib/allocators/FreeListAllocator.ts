import { AllocatorHelper } from '../../index';
import { TYPED_ARRAY } from '../types/DataType';
import Allocator from './Allocator';
import { add } from 'benny';
import { LoggerManager } from 'logger';

enum MEMORY_BLOCK_HEADER {
    SIZE = 0,
    USED = 4,
    ALIGN = 5,
    HEADER_SIZE = 6,
}

enum MEMORY_BLOCK_HEADER_END {
    SIZE = 0,
    ALIGN = 4,
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

        this.setByteSize(0, this.calcNeedByteSizeWithoutHeaders(this.byteSize));
        this.setUsed(0, false);

        this.dataView.setUint32(this.byteSize - 4, this.calcNeedByteSizeWithoutHeaders(this.byteSize));
        this.dataView.setUint8(this.byteSize - 5, 0);
    }

    private calcNeedSize(byteSize: number) {
        return byteSize + MEMORY_BLOCK_HEADER.HEADER_SIZE + MEMORY_BLOCK_HEADER_END.HEADER_SIZE;
    }

    private calcNeedByteSizeWithoutHeaders(byteSize: number) {
        return byteSize - MEMORY_BLOCK_HEADER.HEADER_SIZE - MEMORY_BLOCK_HEADER_END.HEADER_SIZE;
    }

    private setByteSize(address: number, byteSize: number) {
        this.dataView.setUint32(address, byteSize);
    }

    private getByteSize(address: number) {
        return this.dataView.getUint32(address);
    }

    private setUsed(address: number, status: boolean) {
        this.dataView.setUint8(address + MEMORY_BLOCK_HEADER.USED, status ? 2 : 1);
    }

    private isUsed(address: number) {
        return this.dataView.getUint8(address + MEMORY_BLOCK_HEADER.USED) === 2;
    }

    private setAlign(address: number, align: number) {
        this.dataView.setUint8(address + MEMORY_BLOCK_HEADER.ALIGN, align);
    }

    private getAlign(address: number) {
        return this.dataView.getUint8(address);
    }

    printMemory() {
        const list = [];
        for (let i = 0; i < this.byteSize; i++) {
            if (i % 4 === 0) {
                list.push('  ');
            }
            if (i % 16 === 0) {
                list.push('\n');
            }
            const data = this.dataView.getUint8(i).toString();
            list.push(`[${'0'.repeat(3 - data.length)}${data}]`);
        }

        LoggerManager.get('MemoryServer::ALLOCATORS').debug(list.join(''));
    }

    private markUse(size: number, address: number, alignment: number) {
        const alignForwardAdjustmentWithHeader = AllocatorHelper.alignForwardAdjustmentWithHeader(
            address,
            alignment,
            MEMORY_BLOCK_HEADER.HEADER_SIZE
        );
        this.setByteSize(address, this.calcNeedSize(size));
        this.setUsed(address, true);

        this.dataView.setUint32(address + alignForwardAdjustmentWithHeader + size + 1, this.calcNeedSize(size));
        this.dataView.setUint8(address + alignForwardAdjustmentWithHeader - 1, alignForwardAdjustmentWithHeader);
        this.dataView.setUint8(address + alignForwardAdjustmentWithHeader + size, alignForwardAdjustmentWithHeader);

        this.printMemory();

        return new DataView(this.arrayBuffer, alignForwardAdjustmentWithHeader, size);
    }

    private isFree(address: number) {
        return this.dataView.getUint8(address + MEMORY_BLOCK_HEADER.USED) === 0;
    }

    private sizeOf(address: number) {
        return this.dataView.getUint32(address);
    }

    deallocate(dataView: TYPED_ARRAY): void {}

    malloc(size: number, alignment: number): DataView {
        let address = 0;

        if (address < this.byteSize) {
            if (!this.isUsed(address) && this.getByteSize(address) >= this.calcNeedSize(size)) {
                return this.markUse(size, address, alignment);
            }
            address = 0;
        }

        return new DataView(this.arrayBuffer);
    }
}
