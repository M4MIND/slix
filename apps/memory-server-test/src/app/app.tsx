import { MATH_ALLOCATOR, Matrix4, Vector4 } from 'mathf';
import {
    BoundaryTagAllocator,
    Float32NativeArray,
    FreeListAllocator,
    LinearAllocator,
    MemoryCalculate,
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
        console.log('i fire once');

        MemoryServer.startUp({
            root: LinearAllocator,
            name: '_ROOT',
            default: {
                allocator: LinearAllocator,
                byteSize: 1024,
            },
            children: [
                {
                    name: MATH_ALLOCATOR.PERSISTENT_MATRIX,
                    byteSize: MemoryCalculate.MB(56),
                    allocator: PoolAllocator,
                    params: [128, 4],
                },
                {
                    name: MATH_ALLOCATOR.PERSISTENT_MATRIX_CACHE,
                    byteSize: MemoryCalculate.MB(56),
                    allocator: PoolAllocator,
                    params: [128, 4],
                },
            ],
        });

        let timeFinish = 0;
        for (let x = 0; x < 100; x++) {
            const time = performance.now();
            for (let i = 0; i < 100000; i++) {
                new Matrix4();
            }
            timeFinish += performance.now() - time;
            MemoryServer.getAllocator(MATH_ALLOCATOR.PERSISTENT_MATRIX_CACHE).clear();
            MemoryServer.getAllocator(MATH_ALLOCATOR.PERSISTENT_MATRIX).clear();
        }
        console.log(timeFinish, timeFinish / 100, timeFinish / 100 / 1000);
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <progress value={memory.used} max={memory.max}></progress>
        </div>
    );
}

export default App;
