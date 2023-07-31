import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import { MemoryServer, Uint8NativeArray, Uint32NativeArray } from 'memory';
import React from 'react';

export function App() {
    MemoryServer.startUp({
        linearAllocatorByteSize: 64 * 1024 * 1024,
        stackAllocatorByteSize: 64 * 1024 * 1024,
    });

    return <div></div>;
}

export default App;
