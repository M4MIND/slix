import Vector3 from './Vector3';

describe('mathf Vector3.add', () => {
    const a = new Vector3(2, 2, 2);
    const b = new Vector3(1, 4, 5);
    const c = a.add(b);

    expect(c.components).toEqual([3, 6, 7]);
})