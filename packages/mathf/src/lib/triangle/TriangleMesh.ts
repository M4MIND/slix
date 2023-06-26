import Vector3 from '../vector/Vector3';

export default class TriangleMesh {
    private triangles: { indices: number[]; normal: Vector3 }[] = [];
    private vertices: Vector3[] = [];


    public static create() {
        return new TriangleMesh();
    }
}