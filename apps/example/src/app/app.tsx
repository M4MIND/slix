import { RendererServer } from 'renderer';
import React, { useEffect } from 'react';

export function App() {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvas.current) {
            RendererServer.init({
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
