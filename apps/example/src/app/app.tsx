import React from 'react';
import { Mesh, RendererServer, VertexAttributeDescriptor, VertexAttributeFormat } from 'renderer';


export function App() {
    RendererServer.startUp({
        canvas: document.createElement('canvas'),
        width: 600,
        height: 600
    })

    const mesh = new Mesh();

    const array = new ArrayBuffer(216);
    const dataView = new DataView(array);

    mesh.SetVertexBufferParams(9, [
        new VertexAttributeDescriptor('position', VertexAttributeFormat.Float32, 3),
        new VertexAttributeDescriptor('normal', VertexAttributeFormat.Float32, 2),
        new VertexAttributeDescriptor('tangent', VertexAttributeFormat.Uint8, 4)
    ]);


    mesh.setVertexBufferData(dataView, 9)


    return <div></div>;
}

export default App;
