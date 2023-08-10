import { Vector2, Vector3 } from 'mathf';
import { Float32NativeArray, NativeArrayHelper, Uint16NativeArray } from 'memory';
import { BaseMesh, GL_VERTEX_ATTRIBUTE_FORMAT, VertexAttribute, VertexAttributeDescriptor } from 'renderer';

export default class Mesh extends BaseMesh {
    private _vertices: Vector3[] = [];
    private _uv: Vector2[] = [];
    private _triangles: Uint16NativeArray = new Uint16NativeArray(1);
    private _normals: Vector3[] = [];
    get vertices(): Vector3[] {
        return this._vertices;
    }
    get uv() {
        return this._uv;
    }
    get triangles() {
        return this._triangles;
    }
    get normals() {
        return this._normals;
    }

    constructor() {
        super();
        this.setVertexBufferParams(
            ...VertexAttributeDescriptor.makeList(
                [VertexAttribute.Position, GL_VERTEX_ATTRIBUTE_FORMAT.Float32, 3],
                [VertexAttribute.Normal, GL_VERTEX_ATTRIBUTE_FORMAT.Float32, 3]
            )
        );
    }

    set vertices(value: Vector3[]) {
        this._vertices = value;
    }

    set uv(v: Vector2[]) {
        this._uv = v;
    }

    set triangles(v: Uint16NativeArray) {
        this._triangles = v;
    }

    set normals(v: Vector3[]) {
        this._normals = v;
    }

    setColors() {}

    uploadMeshData() {
        const array = new Float32NativeArray(this.attributeOneSize * this.vertices.length);

        NativeArrayHelper.merge(array, this.attributeOneSize, this.vertices).merge(
            array,
            this.attributeOneSize,
            this.vertices,
            3
        );

        this.setVertexBufferData(array);
        this.setIndexBufferData(this.triangles);
    }

    calculateNormals() {}
}
