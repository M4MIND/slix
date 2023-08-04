import LinearAllocator from '../../../../packages/memory/src/lib/allocators/LinearAllocator';
import { SlixEngine } from 'core';
import { Matrix4, Vector3 } from 'mathf';
import { Collection, MemoryServer } from 'memory';
import React, { useEffect, useRef, useState } from 'react';
import {
    AttributeGraphicsBuffer,
    GL_VERTEX_ATTRIBUTE_FORMAT,
    IndicesGraphicsBuffer,
    MESH_TOPOLOGY,
    Material,
    RendererParams,
    RendererServer,
    Shader,
} from 'renderer';

export function App() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const [memoryServer, setMemoryServer] = useState<LinearAllocator>();
    const [memory, setMemory] = useState({
        total: 0,
        used: 0,
    });
    useEffect(() => {
        SlixEngine.startUp({
            rendererServer: {
                canvas: {
                    canvas: canvas.current as HTMLCanvasElement,
                    height: window.innerHeight,
                    width: window.innerWidth,
                },
                shaders: [
                    {
                        name: 'default',
                        vertex: `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec3 _POSITION;
in vec4 _COLORS;

uniform mat4 _PROJECTION;
uniform mat4 _MODEL_MATRIX;

out vec4 v_color;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = _PROJECTION * _MODEL_MATRIX * vec4(_POSITION, 1) ;
  v_color = _COLORS;
}`,
                        fragment: `#version 300 es

precision highp float;

in vec4 v_color;

out vec4 outColor;

void main() {
  outColor = v_color;
}
`,
                    },
                ],
            },
            memoryServer: {
                linearAllocatorByteSize: 64 * 1024 * 1024,
                stackAllocatorByteSize: 64 * 1024 * 1024,
            },
        });

        setMemoryServer(MemoryServer.linearAllocator);

        const [positionsBuffer, colorsBuffer, indicesBuffer] = [
            new AttributeGraphicsBuffer(3, GL_VERTEX_ATTRIBUTE_FORMAT.Float32),
            new AttributeGraphicsBuffer(4, GL_VERTEX_ATTRIBUTE_FORMAT.Float32),
            new IndicesGraphicsBuffer(GL_VERTEX_ATTRIBUTE_FORMAT.Unit16),
        ];

        const faceColors = [
            [1.0, 1.0, 1.0, 1.0], // Front face: white
            [1.0, 0.0, 0.0, 1.0], // Back face: red
            [0.0, 1.0, 0.0, 1.0], // Top face: green
            [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
            [1.0, 1.0, 0.0, 1.0], // Right face: yellow
            [1.0, 0.0, 1.0, 1.0], // Left face: purple
        ];

        // Convert the array of colors into a table for all the vertices.

        let colors: number[] = [];

        for (let j = 0; j < faceColors.length; ++j) {
            const c = faceColors[j];
            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c, c, c, c);
        }

        const colorArray = new Collection.Float32NativeArray(colors);

        positionsBuffer.setData(
            new Collection.Float32NativeArray([
                // Front face
                -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

                // Back face
                -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

                // Top face
                -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

                // Right face
                1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

                // Left face
                -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
            ])
        );

        colorsBuffer.setData(colorArray);

        indicesBuffer.setData(
            new Collection.Uint16NativeArray([
                0,
                1,
                2,
                0,
                2,
                3, // front
                4,
                5,
                6,
                4,
                6,
                7, // back
                8,
                9,
                10,
                8,
                10,
                11, // top
                12,
                13,
                14,
                12,
                14,
                15, // bottom
                16,
                17,
                18,
                16,
                18,
                19, // right
                20,
                21,
                22,
                20,
                22,
                23, // left
            ])
        );

        const rp = new RendererParams(new Material(Shader.find('default')));
        rp.materialPropertyBlock.setBuffer('_POSITION', positionsBuffer);
        rp.materialPropertyBlock.setBuffer('_COLORS', colorsBuffer);
        rp.materialPropertyBlock.setMatrix(
            '_PROJECTION',
            Matrix4.projection(
                (75 * Math.PI) / 180,
                RendererServer.canvasManager.width / RendererServer.canvasManager.height,
                0.1,
                1000
            )
        );

        const [x, y, z] = [0, 0, 0];

        const defaultMatrix = new Matrix4();
        const position = new Vector3(4, 0, -34);
        const scale = new Vector3(3, 3, 6);
        let r = 0;

        rp.materialPropertyBlock.setMatrix('_MODEL_MATRIX', defaultMatrix);

        const step = () => {
            r += (0.02 * Math.PI) / 180;
            defaultMatrix.clear();
            defaultMatrix.translate(position).scale(scale).rotateX(r).rotateY(r).rotateZ(r);
            RendererServer.graphicsManager.drawElements(
                rp,
                MESH_TOPOLOGY.TRIANGLES,
                indicesBuffer,
                indicesBuffer.count
            );

            window.requestAnimationFrame(step);
        };
        step();
    }, []);

    return (
        <div>
            <canvas ref={canvas} />
            <div style={{ position: 'fixed', top: 0, padding: 8, background: 'rgba(255,255,255,0.7)' }}>
                Memory: <br />
                used: {memoryServer?.usedMemory} byte <br />
                free: {(memoryServer?.byteSize ?? 0) - (memoryServer?.usedMemory ?? 0)} byte <br />
                allocateCount: {memoryServer?.numAllocations}
            </div>
        </div>
    );
}

export default App;
