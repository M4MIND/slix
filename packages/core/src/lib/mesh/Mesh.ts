import { Vector2, Vector3 } from 'mathf';
import { Uint16NativeArray } from 'memory';
import { BaseMesh, GraphicsBuffer } from 'renderer';

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

    private _vertices: Vector3[] = [];
    private _uv: Vector2[] = [];
    private _triangles: Uint16NativeArray = new Uint16NativeArray(1);
    private _normals: Vector3[] = [];

    constructor() {
        super();
        this.setVertexBuffer(AttributeGraphicsBufferIndexes._A_POSITION, new GraphicsBuffer());
        this.setVertexBuffer(AttributeGraphicsBufferIndexes._A_NORMALS, new GraphicsBuffer());
    }

    setColors() {}

    uploadMeshData() {}
}
