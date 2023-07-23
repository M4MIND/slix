import BaseAllocator from './BaseAllocator';

enum LockBytesSize {
    HEADER_FREE_BYTES = Int32Array.BYTES_PER_ELEMENT,
    HEADER_STATUS_USE_BLOCK = Int8Array.BYTES_PER_ELEMENT,
}

// ВЫРАВНИВАНИЕ ПАМЯТИ!!!!!

export default class BoundaryTagAllocator extends BaseAllocator {
    constructor(arrayBuffer: ArrayBuffer) {
        super(arrayBuffer);
        this.prepare();
    }

    private prepare() {
        this.dataView.setUint32(
            0,
            this.byteSize -
                LockBytesSize.HEADER_FREE_BYTES -
                LockBytesSize.HEADER_FREE_BYTES -
                LockBytesSize.HEADER_STATUS_USE_BLOCK
        );

        this.dataView.setUint8(LockBytesSize.HEADER_FREE_BYTES, 0x1);
        this.dataView.setUint32(
            this.byteSize - LockBytesSize.HEADER_FREE_BYTES,
            this.byteSize -
                LockBytesSize.HEADER_FREE_BYTES -
                LockBytesSize.HEADER_FREE_BYTES -
                LockBytesSize.HEADER_STATUS_USE_BLOCK
        );
    }

    alloc(byteSize: number): DataView | null {
        if (byteSize <= 0) {
            return null;
        }

        let address = 0;
        let offset = 0;

        while (address < this.byteSize) {
            offset = 4 - ((address + byteSize) % 4);
            if (this.isFree(address) && this.sizeOf(address) >= byteSize + 9 + offset) {
                return new DataView(this.arrayBuffer, this.markUsed(address, byteSize), byteSize + offset);
            }

            address = this.nextAddress(address);
        }

        return null;
    }

    dealloc(dataView: DataView): void {
        this.markFree(dataView.byteOffset - 5);
        this.coalesce(dataView.byteOffset - 5);
    }

    private markUsed(address: number, byteSize: number) {
        const blockSize = this.sizeOf(address);

        this.dataView.setUint32(address, byteSize);
        this.dataView.setUint8(address + 4, 2);

        const nextAddress = this.nextAddress(address);

        this.dataView.setUint32(nextAddress, blockSize - byteSize - 9);
        this.dataView.setUint8(nextAddress + 4, 1);
        this.dataView.setUint32(nextAddress + blockSize - byteSize - 4, blockSize - byteSize - 9);
        this.dataView.setUint32(nextAddress - 4, byteSize);

        return address + 5;
    }

    private markFree(address: number) {
        const size = this.sizeOf(address);

        this.dataView.setUint32(address, size);
        this.dataView.setUint8(address + 4, 1);
    }

    private isFree(address: number) {
        return this.dataView.getUint8(address + 4) === 1;
    }

    private sizeOf(address: number) {
        return this.dataView.getUint32(address);
    }

    private isLast(address: number) {
        return address + this.sizeOf(address) + 9 === this.byteSize;
    }

    private nextAddress(address: number) {
        return address + 9 + this.sizeOf(address);
    }

    private prevAddress(address: number) {
        if (address === 0) {
            return null;
        }

        return address - this.sizeOf(address - 4) - 9;
    }

    private coalesce(address: number) {
        if (!this.isLast(address)) {
            const nextAddress = this.nextAddress(address);

            if (this.isFree(nextAddress)) {
                const size = this.sizeOf(address);
                this.dataView.setUint32(address, 0);
                this.dataView.setUint8(address + 4, 0);
                this.dataView.setUint32(address + size + 5, 0);

                const nextSize = this.sizeOf(nextAddress);
                this.dataView.setUint32(nextAddress, 0);
                this.dataView.setUint8(nextAddress + 4, 0);
                this.dataView.setUint32(nextAddress + nextSize + 5, 0);

                const newSize = size + nextSize + 9;
                this.dataView.setUint32(address, newSize);
                this.dataView.setUint8(address + 4, 1);
                this.dataView.setUint32(address + newSize + 5, newSize);
            }
        }

        if (address !== 0) {
            const previewAddress = this.prevAddress(address);
            if (previewAddress !== null && this.isFree(previewAddress)) {
                const previewSize = this.sizeOf(previewAddress);

                this.dataView.setUint32(previewAddress, 0);
                this.dataView.setUint8(previewAddress + 4, 0);
                this.dataView.setUint32(previewAddress + previewSize + 5, 0);

                const size = this.sizeOf(address);
                this.dataView.setUint32(address, 0);
                this.dataView.setUint8(address + 4, 0);
                this.dataView.setUint32(address + size + 5, 0);

                const newSize = size + previewSize + 9;
                this.dataView.setUint32(previewAddress, newSize);
                this.dataView.setUint8(previewAddress + 4, 1);
                this.dataView.setUint32(previewAddress + newSize + 5, newSize);
            }
        }
    }
}
