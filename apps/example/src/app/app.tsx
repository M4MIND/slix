import FreeListAllocator from '../../../../packages/memory/src/lib/allocators/FreeListAllocator';
import { Matrix4, Vector3 } from 'mathf';
import { MemoryServer } from 'memory';
import React from 'react';
import {
    Cube,
    ElementArrayGraphicsBuffer,
    GL_USAGE_BUFFER,
    MESH_TOPOLOGY,
    Material,
    RendererParams,
    RendererServer,
    VertexArrayGraphicsBuffer,
} from 'renderer';

export function App() {
    MemoryServer.startUp(64);

    new Vector3();

    return <div></div>;
}

export default App;
