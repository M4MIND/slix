import PoolAllocator from '../../../../packages/memory/src/lib/allocators/PoolAllocator';
import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import { BoundaryTagAllocator, Float32NativeArray, FreeListAllocator, LinearAllocator, MemoryServer } from 'memory';
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
            children: [{ name: '_FREE_LIST', allocator: PoolAllocator, byteSize: 512 * 1024 }],
        });

        const loop = () => {
            new Float32NativeArray(16, '_FREE_LIST');
            setMemory({
                used: MemoryServer.getAllocator('_FREE_LIST').usedMemory,
                max: MemoryServer.getAllocator('_FREE_LIST').byteSize,
            });
            window.requestAnimationFrame(loop);
        };

        loop();
        // const DataView = MemoryServer.getAllocator('_FREE_LIST').malloc(11, 4);
        //
        // for (let i = 0; i < DataView.byteLength; i++) {
        //     DataView.setUint8(i, 0);
        // }
        // setMemory([...MemoryServer.getAllocator<FreeListAllocator>('_FREE_LIST').printMemory()]);
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <progress value={memory.used} max={memory.max}></progress>
        </div>
    );
}

export default App;
