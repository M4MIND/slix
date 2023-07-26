import GraphicsBuffer from '../buffer/GraphicsBuffer';
import { Matrix4, Vector4 } from 'mathf';

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
    private readonly uniforms: { [key in UniformTypes]: { [index: string]: number | number[] } } = {
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
        if (!this.buffers[name]) {
            this.buffers[name] = buffer;

            return this;
        }

        return this;
    }

    private setUniform(type: UniformTypes, name: string, v: number | number[]) {
        this.uniforms[type][name] = v;
        return this;
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

    setVectorArray(name: string, v: Vector4[]) {
        return this.setUniform(UniformTypes.VECTOR_ARRAY, name, v.flat());
    }

    setMatrix(name: string, v: Matrix4) {
        return this.setUniform(UniformTypes.MATRIX, name, v);
    }

    setMatrixArray(name: string, v: Matrix4[]) {
        return this.setUniform(UniformTypes.MATRIX_ARRAY, name, v.flat());
    }
}
