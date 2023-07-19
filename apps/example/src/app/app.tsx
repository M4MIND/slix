import Cell from './cell';
import { Vector2, Vector3 } from 'mathf';
import { MemoryServer } from 'memory';
import React, { useEffect, useState } from 'react';
import { RendererServer } from 'renderer';

export function App() {
    const canvas = React.useRef<HTMLCanvasElement>(null);

    const v = new Vector3(3, 4, 5);
    const v2 = new Vector2(2, 3);

    v.add(new Vector3(1, 4, 3));

    return <div></div>;
}

export default App;
