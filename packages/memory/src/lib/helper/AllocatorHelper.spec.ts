import AllocatorHelper from './AllocatorHelper';

describe('AllocatorHelper', () => {
    test('alignForwardAdjustment: address = 26, alignment = 1. result === 0', () => {
        expect(AllocatorHelper.alignForwardAdjustment(26, 2)).toEqual(0);
    });
    test('alignForwardAdjustment: address = 26, alignment = 2. result === 0', () => {
        expect(AllocatorHelper.alignForwardAdjustment(26, 2)).toEqual(0);
    });
    test('alignForwardAdjustment: address = 26, alignment = 4. result === 0', () => {
        expect(AllocatorHelper.alignForwardAdjustment(26, 4)).toEqual(2);
    });
});
