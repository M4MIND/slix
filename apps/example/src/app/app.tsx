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
import { Matrix4, Vector3 } from 'mathf';
import { Float32NativeArray, LinearAllocator, MemoryServer } from 'memory';
import React, { useEffect, useRef, useState } from 'react';
import { BaseShader, MESH_TOPOLOGY, RendererServer, UniformGraphicsBuffer } from 'renderer';

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
precision lowp float;
in vec3 _A_POSITION;
in vec3 _A_NORMALS;

uniform _SlixCameraAndScreen {
    vec3 _WorldSpaceCameraPos;
    mat4 _MatrixView;
    vec4 _ProjectionParams;
    vec4 _ScreenParams;
    mat4 _CameraProjection;
    mat4 _CameraInvProjection;
} SlixCameraAndScreen;

uniform _SlixTime {
    vec4 _TIME;
    vec4 _SinTime;
    vec4 _CosTime;
    vec4 _DeltaTime;
} SlixTime;


uniform mat4 _U_MODEL;
uniform vec4 _U_COLOR;

out vec4 v_color;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = SlixCameraAndScreen._CameraProjection * SlixCameraAndScreen._MatrixView * _U_MODEL * vec4(_A_POSITION, 1);
  v_color = (_U_COLOR + vec4(_A_NORMALS, 1));
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

        const position = new Vector3(0, 0, 0);

        const camera = new Camera();

        const gameObject = new GameObject('GameObject', MeshFilterComponent, MeshRendererComponent);
        const meshFilter = gameObject.getComponent<MeshFilterComponent>(MeshFilterComponent);
        const meshRenderer = gameObject.getComponent<MeshRendererComponent>(MeshRendererComponent);

        meshRenderer.material = new Material(BaseShader.find('default'));
        meshFilter.mesh = new Cube();

        meshFilter.mesh.topology = MESH_TOPOLOGY.TRIANGLES;
        meshFilter.mesh.uploadMeshData();

        meshRenderer.material.shader.use();

        const matrixView = new Matrix4();

        const UniformBuffer = new UniformGraphicsBuffer();

        const matrix = new Float32NativeArray(36);
        matrix.set(Matrix4.projection((80 * Math.PI) / 180, RendererServer.canvasManager.aspect), 0);

        RendererServer.contextManager.bindBufferBase(UniformBuffer.target, 0, UniformBuffer.bufferHandle);

        const count = 156 * 156;
        matrix[32] = Math.random();
        matrix[33] = Math.random();
        matrix[34] = Math.random();
        matrix[35] = 1;

        matrix.set(matrixView.translate(position), 16);

        meshRenderer.material.shader.use();
        const step = () => {
            UniformBuffer.setData(matrix);
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
