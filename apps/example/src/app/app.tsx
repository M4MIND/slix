import React, { useEffect } from 'react';
import { RendererServer } from 'renderer';

export function App() {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvas.current) {
            RendererServer.startUp({
                canvas: canvas.current,
                width: window.innerWidth,
                height: window.innerHeight,
            }).test();
        }
    }, []);

    return (
        <div>
            <canvas ref={canvas}></canvas>
        </div>
    );
}

export default App;
