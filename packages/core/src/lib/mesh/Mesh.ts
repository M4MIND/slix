import { Vector2, Vector3 } from 'mathf';
import { Float32NativeArray, Uint16NativeArray } from 'memory';
import { BaseMesh, VertexAttribute, VertexAttributeDescriptor, VertexAttributeFormat } from 'renderer';

enum AttributeGraphicsBufferIndexes {
    '_A_POSITION',
    '_A_NORMALS',
}

export default class Mesh extends BaseMesh {
    get vertices(): Vector3[] {
        return this._vertices.slice();
    }

    set vertices(value: Vector3[]) {
        this._vertices = value;
    }

    get uv() {
        return this._uv;
    }

    set uv(v: Vector2[]) {
        this._uv = v;
    }

    get triangles() {
        return this._triangles;
    }

    set triangles(v: Uint16NativeArray) {
        this._triangles = v;
    }

    get normals() {
        return this._normals;
    }

    set normals(v: Vector3[]) {
        this._normals = v;
    }

    constructor() {
        super();
        this.setVertexBufferParams(
            new VertexAttributeDescriptor(VertexAttribute.Position, VertexAttributeFormat.Float32, 3),
            new VertexAttributeDescriptor(VertexAttribute.Normal, VertexAttributeFormat.Float32, 3),
            new VertexAttributeDescriptor(VertexAttribute.Color, VertexAttributeFormat.Float32, 4)
        );
    }
    private _vertices: Vector3[] = [];
    private _uv: Vector2[] = [];
    private _triangles: Uint16NativeArray = new Uint16NativeArray(1);
    private _normals: Vector3[] = [];

    setColors() {}

    uploadMeshData() {
        const array = new Float32NativeArray(this.vertexCountElements * this.vertices.length);

        for (const v of Object.values(this.vertexAttributeDescriptor)) {
            const countVertex = this.vertices.length;

            for (let i = 0; i < countVertex; i++) {}
        }

        console.dir(array);
    }
}
