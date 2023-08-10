import { TYPED_ARRAY } from '../../index';

export default class NativeArrayHelper {
    static merge(a: TYPED_ARRAY, step: number, b: TYPED_ARRAY[], offset = 0) {
        const len = b.length;
        for (let i = 0; i < len; i++) {
            a.set(b[i], step * i + offset);
        }

        return this;
    }

    static mergeCollection(_out: TYPED_ARRAY, _in: [TYPED_ARRAY, number][], step: number) {}
}
