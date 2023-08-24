// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import { BoundaryTagAllocator, Float32NativeArray, LinearAllocator, MemoryServer } from 'memory';
import { useEffect, useState } from 'react';

export function App() {
    const [memory, setMemory] = useState<number[]>([]);
    useEffect(() => {
        console.log('i fire once');

        MemoryServer.startUp({
            root: LinearAllocator,
            name: '_ROOT',
            default: {
                allocator: LinearAllocator,
                byteSize: 1024,
            },
            children: [{ name: '_FREE_LIST', allocator: LinearAllocator, byteSize: 64 * 1024 * 1024 }],
        });

        console.time('Float32NativeArray');
        for (let i = 0; i < 100000; i++) {
            new Float32NativeArray(128, '_FREE_LIST');
        }
        console.timeEnd('Float32NativeArray');

        console.time('Float32Array');
        for (let i = 0; i < 100000; i++) {
            new Float32Array(128);
        }
        console.timeEnd('Float32Array');

        console.time('Array');
        for (let i = 0; i < 100000; i++) {
            new Array(128);
        }
        console.timeEnd('Array');
    }, []);

    return <div style={{ display: 'flex', flexWrap: 'wrap' }}></div>;
}

export default App;
