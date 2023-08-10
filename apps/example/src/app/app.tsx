import { GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT } from '../../../../packages/renderer/src/lib/webgl.consts';
import {
    Camera,
    Cube,
    GameObject,
    Material,
    MeshFilterComponent,
    MeshRendererComponent,
    SlixEngine,
    Torus,
} from 'core';
import { LinearAllocator, MemoryServer } from 'memory';
import React, { useEffect, useRef, useState } from 'react';
import { BaseShader, MESH_TOPOLOGY, RendererServer } from 'renderer';

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
in vec3 _A_POSITION;
in vec3 _A_NORMALS;

uniform mat4 _U_PROJECTION;
uniform mat4 _U_MODEL;
uniform vec4 _U_COLOR;

out vec4 v_color;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = _U_PROJECTION * _U_MODEL * vec4(_A_POSITION, 1);
  v_color = _U_COLOR + vec4(_A_NORMALS, 1);
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
                linearAllocatorByteSize: 128 * 1024 * 1024,
                stackAllocatorByteSize: 64 * 1024 * 1024,
            },
        });

        setMemoryServer(MemoryServer.linearAllocator);

        const camera = new Camera();

        const gameObject = new GameObject('GameObject', MeshFilterComponent, MeshRendererComponent);
        const meshFilter = gameObject.getComponent<MeshFilterComponent>(MeshFilterComponent);
        const meshRenderer = gameObject.getComponent<MeshRendererComponent>(MeshRendererComponent);

        meshRenderer.material = new Material(BaseShader.find('default'));
        meshFilter.mesh = new Cube();

        meshFilter.mesh.topology = MESH_TOPOLOGY.TRIANGLES;
        meshFilter.mesh.uploadMeshData();

        const count = 64 * 64;

        const step = () => {
            RendererServer.contextManager.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
            if (meshFilter.mesh && meshRenderer.material) {
                for (let i = 0; i < count; i++) {
                    RendererServer.graphicsManager.renderMesh(meshFilter.mesh, meshRenderer.material);
                }
            }

            window.requestAnimationFrame(step);
        };

        step();
    }, []);

    return (
        <div>
            <canvas ref={canvas} />
        </div>
    );
}

export default App;
