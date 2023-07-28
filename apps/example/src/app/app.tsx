import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import { MemoryServer, Uint8NativeArray, Uint32NativeArray } from 'memory';
import React from 'react';

export function App() {
    MemoryServer.startUp(64);

    const out = [];

    const count = 2048;

    let array = null;
    const emptyData = new Array(1024000);

    for (let i = 0; i < emptyData.length; i++) {
        emptyData[i] = Math.round(Math.random() * 100);
    }

    for (let i = 0; i < count; i++) {
        const ddd: { [index: string]: number } = {
            'Uint8NativeArray.set(x, y)': 0,
            'Uint8NativeArray[x]=y': 0,
            'Uint8NativeArray.copyTo()': 0,
            'Uint8NativeArray()': 0,
            'Array[x]=y': 0,
            'Array.from()': 0,
        };
        let start = window.performance.now();

        array = new Uint32NativeArray(1024000);
        for (let i = 0; i < 1024000; i++) {
            array.set(i, Math.PI);
        }

        MemoryServer.linearAllocator.clear();

        ddd['Uint8NativeArray.set(x, y)'] = window.performance.now() - start;

        start = window.performance.now();

        array = new Uint32NativeArray(1024000).data;
        for (let i = 0; i < 1024000; i++) {
            array[i] = Math.PI;
        }

        MemoryServer.linearAllocator.clear();

        ddd['Uint8NativeArray[x]=y'] = window.performance.now() - start;

        start = window.performance.now();

        new Uint32NativeArray(1024000).copyFrom(emptyData);

        MemoryServer.linearAllocator.clear();

        ddd['Uint8NativeArray.copyTo()'] = window.performance.now() - start;

        start = window.performance.now();

        new Uint32NativeArray(emptyData);

        MemoryServer.linearAllocator.clear();

        ddd['Uint8NativeArray()'] = window.performance.now() - start;

        // start = window.performance.now();
        //
        // array = new Array(1024000);
        // for (let i = 0; i < 1024000; i++) {
        //     array[i] = Math.PI;
        // }
        //
        // ddd['Array[x]=y'] = window.performance.now() - start;
        //
        // start = window.performance.now();
        // Array.from(emptyData);
        //
        // ddd['Array.from()'] = window.performance.now() - start;

        out.push(ddd);
    }

    const ttt: { [index: string]: number } = {
        'Uint8NativeArray.set(x, y)': 0,
        'Uint8NativeArray[x]=y': 0,
        'Uint8NativeArray.copyTo()': 0,
        'Uint8NativeArray()': 0,
        'Array[x]=y': 0,
        'Array.from()': 0,
    };

    out.map((v, k) => {
        ttt['Uint8NativeArray.set(x, y)'] += v['Uint8NativeArray.set(x, y)'];
        ttt['Uint8NativeArray[x]=y'] += v['Uint8NativeArray[x]=y'];
        ttt['Uint8NativeArray.copyTo()'] += v['Uint8NativeArray.copyTo()'];
        ttt['Uint8NativeArray()'] += v['Uint8NativeArray()'];
        ttt['Array[x]=y'] += v['Array[x]=y'];
        ttt['Array.from()'] += v['Array.from()'];
    });

    console.table(ttt);
    console.table(
        Object.keys(ttt).map((v, k) => {
            return {
                [v]: ttt[v] / 1000,
            };
        })
    );
    console.table({
        'Uint8NativeArray.set(x, y)': ttt['Uint8NativeArray.set(x, y)'] / count,
        'Uint8NativeArray[x]=y': ttt['Uint8NativeArray[x]=y'] / count,
        'Uint8NativeArray.copyTo()': ttt['Uint8NativeArray.copyTo()'] / count,
        'Uint8NativeArray()': ttt['Uint8NativeArray()'] / count,
        'Array[x]=y': ttt['Array[x]=y'] / count,
        'Array.from()': ttt['Array.from()'] / count,
    });
    // console.table(
    //     out.map((obj) => {
    //         return {
    //             ...obj,
    //             fast: Object.keys(obj).reduce((key: string, v) => (obj[v] < obj[key] ? v : key)),
    //             slow: Object.keys(obj).reduce((key: string, v) => (obj[v] > obj[key] ? v : key)),
    //         };
    //     })
    // );

    return <div></div>;
}

export default App;
