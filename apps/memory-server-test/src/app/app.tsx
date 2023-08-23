// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import { Float32NativeArray, FreeListAllocator, LinearAllocator, MemoryServer } from 'memory';
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
            children: [{ name: '_FREE_LIST', allocator: FreeListAllocator, byteSize: 1024 }],
        });

        setInterval(() => {
            new Float32NativeArray(2, '_FREE_LIST');
            setMemory([...MemoryServer.getAllocator<FreeListAllocator>('_FREE_LIST').getMemory()]);
        }, 1000);
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {memory.map((v, k) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 36,
                            minHeight: 36,
                            background: 'rgba(0,0,0, 0.2)',
                            marginRight: 2,
                            marginBottom: 2,
                            position: 'relative',
                        }}
                    >
                        <div style={{ position: 'absolute', fontSize: 12, top: -4, display: 'flex' }}>{k}</div>
                        {v}
                    </div>
                );
            })}
        </div>
    );
}

export default App;
