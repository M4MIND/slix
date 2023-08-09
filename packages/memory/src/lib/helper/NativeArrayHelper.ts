import { TYPED_ARRAY } from '../../index';

export default class NativeArrayHelper {
    static merge(a: TYPED_ARRAY, step: number, b: TYPED_ARRAY[], start = 0) {
        const len = b.length;
        for (let i = 0; i < len; i++) {
            a.set(b[i], step * i + start);
        }

        return this;
    }
}
