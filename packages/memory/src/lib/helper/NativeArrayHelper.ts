import { TYPED_ARRAY } from 'memory';

export default class NativeArrayHelper {
    static merge(a: TYPED_ARRAY, b: TYPED_ARRAY[], step: number, start: number = 0) {
        const len = b.length;
        for (let i = 0; i < len; i++) {
            a.set(b[i], step * i + start);
        }

        return this;
    }
}
