// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FreeListAllocator, LinearAllocator, MemoryServer } from 'memory';

export function App() {
    MemoryServer.startUp({
        root: LinearAllocator,
        name: '_ROOT',
        children: [
            { name: '_FREE_LIST', allocator: FreeListAllocator, byteSize: 32 * 1024 * 1024 },
            { name: '_LINEAR', allocator: LinearAllocator, byteSize: 32 * 1024 * 1024 },
            { name: '_LINEAR_TEMP', allocator: LinearAllocator, byteSize: 32 * 1024 * 1024 },
        ],
    });
    return <div></div>;
}

export default App;
