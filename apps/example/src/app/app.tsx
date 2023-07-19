import React from 'react';
import { TypeAllocators, MemoryServer, Struct, StructureNativeArray } from 'memory';
import { Matrix4, Vector3 } from 'mathf';


export function App() {
    const canvas = React.useRef<HTMLCanvasElement>(null);

    MemoryServer.startUp();

    const vertext = [0.2, 0.6, 0.2];
    const position = [0, 0, 0];
    const vectors = [new Vector3(0, 0, 0), new Vector3(0, 12, 4)].flat();
    const matrix = [Matrix4.createDefault(), Matrix4.createDefault()]

    const struct = new StructureNativeArray( new Struct(
        Struct.float32('position', position.length),
        Struct.float32('vertex', vertext.length),
        Struct.float32('vectors', vectors.length),
        Struct.float32('matrix', matrix.length)
    ));

    console.dir(struct.get('matrix'));

    return <div></div>;
}

export default App;
