import Vector3 from '../vector/Vector3';

export default class AABB {
    private position: Vector3;
    private size: Vector3;
    private end: Vector3;

    constructor(position: Vector3, size: Vector3) {
        this.position = position;
        this.size = size;
        this.end = Vector3.add(position, size);
    }

    public getCenter() {
        return Vector3.create(this.position).add(
            Vector3.create(this.size).scale(0.5)
        );
    }
}
