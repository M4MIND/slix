import {
    BoundaryTagAllocator,
    Float32NativeArray,
    FreeListAllocator,
    LinearAllocator,
    MemoryPointer,
    MemoryServer,
    PoolAllocator,
} from 'memory';
import { useEffect, useState } from 'react';

export function App() {
    const [memory, setMemory] = useState<{
        used: number;
        max: number;
    }>({
        used: 0,
        max: 0,
    });
    useEffect(() => {
        MemoryServer.startUp({
            root: LinearAllocator,
            name: '_ROOT',
            default: {
                allocator: LinearAllocator,
                byteSize: 1024,
            },
            children: [
                { name: '_POOL_ALLOCATOR', allocator: PoolAllocator, byteSize: 256 * 1024 * 1024 },
                { name: '_LINEAR_ALLOCATOR', allocator: LinearAllocator, byteSize: 256 * 1024 * 1024 },
                { name: '_BOUNDARY_TAG_ALLOCATOR', allocator: BoundaryTagAllocator, byteSize: 256 * 1024 * 1024 },
            ],
        });
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <progress value={memory.used} max={memory.max}></progress>
        </div>
    );
}

export default App;
