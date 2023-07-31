import Vector3 from './Vector3';

describe('Vector3', () => {
    it('Has components x/y/z === 2,2,2', () => {
        const a = new Vector3(2, 2, 2);

        expect(a).toEqual([2, 2, 2]);
    });

    it('add', () => {
        const a = new Vector3(2, 2, 2);
        const b = new Vector3(4, 3, 1);

        expect(Vector3.add(a, b)).toEqual([6, 5, 3]);
    });
});
