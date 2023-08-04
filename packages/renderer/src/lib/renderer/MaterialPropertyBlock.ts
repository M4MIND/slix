import GraphicsBuffer from '../buffer/GraphicsBuffer';
import { Matrix4, Vector4 } from 'mathf';
import { TYPED_ARRAY } from 'memory';

type Color = [number, number, number, number];

enum UniformTypes {
    INT,
    COLOR,
    VECTOR,
    VECTOR_ARRAY,
    MATRIX,
    MATRIX_ARRAY,
    FLOAT,
    FLOAT_ARRAY,
}

export default class MaterialPropertyBlock {
    private buffers: { [index: string]: GraphicsBuffer } = {};
    private readonly uniforms: { [key in UniformTypes]: { [index: string]: number | number[] | TYPED_ARRAY } } = {
        [UniformTypes.INT]: {},
        [UniformTypes.COLOR]: {},
        [UniformTypes.FLOAT]: {},
        [UniformTypes.FLOAT_ARRAY]: {},
        [UniformTypes.MATRIX]: {},
        [UniformTypes.VECTOR]: {},
        [UniformTypes.MATRIX_ARRAY]: {},
        [UniformTypes.VECTOR_ARRAY]: {},
    };

    setBuffer(name: string, buffer: GraphicsBuffer) {
        this.buffers[name] = buffer;
        return this;
    }

    getBuffers() {
        return Object.values(this.buffers);
    }
    getBuffersKeys() {
        return Object.keys(this.buffers);
    }

    getBufferByKey(key: string) {
        return this.buffers[key];
    }

    private setUniform(type: UniformTypes, name: string, v: number | number[] | TYPED_ARRAY) {
        this.uniforms[type][name] = v;
        return this;
    }

    private getUniform(type: UniformTypes, name: string) {
        return this.uniforms[type][name];
    }

    setInt(name: string, v: number) {
        return this.setUniform(UniformTypes.INT, name, v);
    }

    setFloat(name: string, v: number) {
        return this.setUniform(UniformTypes.FLOAT, name, v);
    }

    setFloatArray(name: string, v: number[]) {
        return this.setUniform(UniformTypes.FLOAT_ARRAY, name, v);
    }

    setColor(name: string, v: Color) {
        return this.setUniform(UniformTypes.COLOR, name, v);
    }

    setVector(name: string, v: Vector4) {
        return this.setUniform(UniformTypes.VECTOR, name, v);
    }

    setMatrix(name: string, v: Matrix4) {
        return this.setUniform(UniformTypes.MATRIX, name, v);
    }

    getMatrix(name: string): number[] {
        return this.getUniform(UniformTypes.MATRIX, name) as number[];
    }
}
