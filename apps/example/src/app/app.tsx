import Cell from './cell';
import { MemoryServer } from 'memory';
import React, { useEffect, useState } from 'react';
import { RendererServer } from 'renderer';

export function App() {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const [memory, setMemory] = useState<number>(0);
    const [memorySnapshot, setMemorySnapshot] = useState<any>(null);
    const [dataViewCollection, setDataViewCollection] = useState<DataView[]>([]);
    useEffect(() => {
        // if (canvas.current) {
        //     RendererServer.startUp({
        //         canvas: canvas.current,
        //         width: window.innerWidth,
        //         height: window.innerHeight,
        //     }).test();
        // }

        MemoryServer.startUp();

        setMemorySnapshot(MemoryServer.BoundaryTagAllocator.makeSnapshot());
    }, []);

    return (
        <div>
            {memorySnapshot !== null ? (
                <div>
                    <h1>Memory snapshot</h1>
                    <p>Size: {memorySnapshot.size} bytes</p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const dataViews = [...dataViewCollection];

                            const DataView = MemoryServer.BoundaryTagAllocator.alloc(memory);

                            if (!DataView) {
                                return;
                            }

                            dataViews.push(DataView);

                            setDataViewCollection(dataViews);

                            setMemorySnapshot(MemoryServer.BoundaryTagAllocator.makeSnapshot());
                        }}
                    >
                        <label>alloc</label>
                        <br />
                        <input name={'alloc'} type={'number'} onChange={(e) => setMemory(parseInt(e.target.value))} />
                        <button type={'submit'}>alloc</button>
                    </form>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', height: 32 }}>
                            {memorySnapshot.data.map((v: any) => {
                                return [
                                    new Array(...new Array(v.header.size)).map((header) => {
                                        return <Cell cellText={v.header.value} bgColor={'#0099ff'}></Cell>;
                                    }),
                                    new Array(...new Array(v.use.size)).map((state) => {
                                        return (
                                            <Cell
                                                cellText={v.use.value ? 'free' : 'use'}
                                                bgColor={v.use.value ? 'green' : 'red'}
                                            ></Cell>
                                        );
                                    }),
                                    new Array(...new Array(v.data.size)).map((data) => {
                                        return (
                                            <Cell
                                                cellText={null}
                                                bgColor={v.use.value ? 'rgba(0,0,0,.1)' : 'orange'}
                                            ></Cell>
                                        );
                                    }),
                                    new Array(...new Array(v.end.size)).map((end) => {
                                        return <Cell cellText={v.end.value} bgColor={'#0099ff'}></Cell>;
                                    }),
                                ];
                            })}
                        </div>
                        <div style={{ maxWidth: 120, width: '100%' }}>
                            {dataViewCollection.map((dataView, k) => {
                                return (
                                    <button
                                        onClick={(v) => {
                                            MemoryServer.BoundaryTagAllocator.dealloc(dataView);
                                            setMemorySnapshot(MemoryServer.BoundaryTagAllocator.makeSnapshot());

                                            setDataViewCollection(
                                                [...dataViewCollection].filter((v, key) => k !== key)
                                            );
                                        }}
                                    >
                                        Destroy {dataView.byteOffset} {dataView.byteLength}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                'vsd'
            )}
            {/*<canvas ref={canvas}></canvas>*/}
        </div>
    );
}

export default App;
