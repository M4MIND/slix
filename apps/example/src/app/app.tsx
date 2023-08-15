import { GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT } from '../../../../packages/renderer/src/lib/webgl.consts';
import {
    Camera,
    Cube,
    GameObject,
    Material,
    MeshFilterComponent,
    MeshRendererComponent,
    SceneManager,
    SlixEngine,
} from 'core';
import { MathHelper, Matrix4, Vector3, Vector4 } from 'mathf';
import { ALLOCATOR, Float32NativeArray, LinearAllocator, MemoryServer, Struct, StructureNativeArray } from 'memory';
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
in vec3 _A_POSITION;
in vec3 _A_NORMALS;


layout(std140) uniform _SlixTime {
    vec4 _Time;
    vec4 _SinTime;
    vec4 _CosTime;
    vec4 _DeltaTime;
} SlixTime;

layout(std140) uniform _SlixCameraAndScreen {
    vec3 _WorldSpaceCameraPos;
    mat4 _MatrixView;
    vec4 _ProjectionParams;
    vec4 _ScreenParams;
    mat4 _CameraProjection;
    mat4 _CameraInvProjection;
    vec4 _Time;
} SlixCameraAndScreen;

uniform mat4 _U_MODEL;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

out vec4 v_color;

// all shaders have a main function
void main() {
  vec3 color = vec3(0.0, 0.0, 0.0);
  color = mix(colorA, colorB, 0.2);
  gl_Position = SlixCameraAndScreen._CameraProjection * SlixCameraAndScreen._MatrixView * _U_MODEL * (vec4(_A_POSITION, 1) + vec4(_A_NORMALS, 1));
  v_color = vec4(color, 1);
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
            },
        });

        SlixEngine.start((sceneManager) => {
            sceneManager.setActiveScene(sceneManager.createScene('MainScene'));

            new GameObject();
        });

        // const gameObject = new GameObject('GameObject', MeshFilterComponent, MeshRendererComponent);
        // const meshFilter = gameObject.getComponent<MeshFilterComponent>(MeshFilterComponent);
        // const meshRenderer = gameObject.getComponent<MeshRendererComponent>(MeshRendererComponent);
        //
        // meshRenderer.material = new Material(BaseShader.find('default'));
        // meshFilter.mesh = new Cube();
        //
        // meshFilter.mesh.topology = MESH_TOPOLOGY.TRIANGLES;
        // meshFilter.mesh.uploadMeshData();
        // meshRenderer.material.shader.use();
        //
        // const MatrixUniformBuffer = new UniformGraphicsBuffer();
        // const TimeUniformBuffer = new UniformGraphicsBuffer();
        //
        // const _SlixCameraAndScreen = new StructureNativeArray(
        //     Struct.create(
        //         Struct.float32('_WorldSpaceCameraPos', 4),
        //         Struct.float32('_MatrixView', 16),
        //         Struct.float32('_ProjectionParams', 4),
        //         Struct.float32('_ScreenParams', 4),
        //         Struct.float32('_CameraProjection', 16),
        //         Struct.float32('_CameraInvProjection', 16),
        //         Struct.float32('_Time', 4)
        //     )
        // );
        //
        // const _SlixTime = new StructureNativeArray(
        //     Struct.create(
        //         Struct.float32('_Time', 4),
        //         Struct.float32('_SinTime', 4),
        //         Struct.float32('_CosTime', 4),
        //         Struct.float32('_DeltaTime', 4)
        //     )
        // );
        //
        // const matrixView = new Matrix4();
        //
        // _SlixCameraAndScreen
        //     .setValues('_WorldSpaceCameraPos', new Vector4(2, 3, 5, 1))
        //     .setValues('_CameraProjection', Matrix4.projection(MathHelper.degToRad(60)))
        //     .setValues('_MatrixView', matrixView.translate([Math.random(), Math.random(), Math.random()]));
        //
        // MatrixUniformBuffer.setData(_SlixCameraAndScreen);
        //
        // RendererServer.contextManager.bindBufferBase(TimeUniformBuffer.target, 1, TimeUniformBuffer.bufferHandle);
        // RendererServer.contextManager.bindBufferBase(MatrixUniformBuffer.target, 0, MatrixUniformBuffer.bufferHandle);
        //
        // _SlixTime.setValues('_SinTime', [Math.random(), Math.random(), Math.random(), Math.random()]);
        // _SlixTime.setValues('_CosTime', [Math.random(), Math.random(), Math.random(), Math.random()]);
        //
        // console.dir(_SlixTime);
        //
        // const step = () => {
        //     _SlixCameraAndScreen.setValues('_Time', [
        //         performance.now() / 8,
        //         performance.now() / 4,
        //         performance.now() / 2,
        //         performance.now(),
        //     ]);
        //
        //     TimeUniformBuffer.setData(_SlixTime);
        //     MatrixUniformBuffer.setData(_SlixCameraAndScreen);
        //
        //     RendererServer.contextManager.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        //     if (meshFilter.mesh && meshRenderer.material) {
        //         for (let i = 0; i < 1; i++) {
        //             RendererServer.graphicsManager.renderMesh(meshFilter.mesh, meshRenderer.material);
        //         }
        //     }
        //
        //     window.requestAnimationFrame(step);
        // };
        //
        // step();
    }, []);

    return (
        <div>
            <canvas ref={canvas} />
        </div>
    );
}

export default App;
