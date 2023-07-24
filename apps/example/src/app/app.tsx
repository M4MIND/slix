import { Matrix4 } from 'mathf';
import React from 'react';
import { Cube, GL_BUFFER_TARGET, GL_USAGE_BUFFER, GraphicsBuffer, RendererParams, RendererServer } from 'renderer';

export function App() {
    RendererServer.startUp({
        canvas: document.createElement('canvas'),
        width: 600,
        height: 600,
    });

    console.dir(RendererServer);

    const meshPositions = new GraphicsBuffer(GL_BUFFER_TARGET.ARRAY_BUFFER, GL_USAGE_BUFFER.STATIC_DRAW);
    const meshColor = new GraphicsBuffer(GL_BUFFER_TARGET.ARRAY_BUFFER, GL_USAGE_BUFFER.STATIC_DRAW);
    const meshIndices = new GraphicsBuffer(GL_BUFFER_TARGET.ELEMENT_ARRAY_BUFFER, GL_USAGE_BUFFER.STATIC_DRAW);

    meshPositions.setData(Float32Array.from(Cube.vertices));
    meshColor.setData(Float32Array.from(Cube.colors));
    meshIndices.setData(Uint16Array.from(Cube.indices));

    const rendererParams = new RendererParams();
    rendererParams.materialPropertyBlock
        .setBuffer('_TRIANGLES', meshIndices)
        .setBuffer('_POSITIONS', meshPositions)
        .setBuffer('_COLORS', meshColor)
        .setMatrix('_MATRIX', Matrix4.default());

    return <div></div>;
}

export default App;
