import { Vector2, Vector3 } from 'mathf';
import { Float32NativeArray, NativeArrayHelper, Uint16NativeArray } from 'memory';
import { BaseMesh, GL_VERTEX_ATTRIBUTE_FORMAT, VertexAttribute, VertexAttributeDescriptor } from 'renderer';

export default class Mesh extends BaseMesh {
    get vertices(): Vector3[] {
        return this._vertices;
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
            new VertexAttributeDescriptor(VertexAttribute.Position, GL_VERTEX_ATTRIBUTE_FORMAT.Float32, 3),
            new VertexAttributeDescriptor(VertexAttribute.Normal, GL_VERTEX_ATTRIBUTE_FORMAT.Float32, 3)
        );
    }
    private _vertices: Vector3[] = [];
    private _uv: Vector2[] = [];
    private _triangles: Uint16NativeArray = new Uint16NativeArray(1);
    private _normals: Vector3[] = [];

    setColors() {}

    uploadMeshData() {
        const array = new Float32NativeArray(this.attributeOneSize * this.vertices.length);

        NativeArrayHelper.merge(array, this.vertices, this.attributeOneSize).merge(
            array,
            this.vertices,
            this.attributeOneSize,
            3
        );

        this._vertexBuffer.setData(array);
        this._indexBuffer.setData(this.triangles);
    }
}
