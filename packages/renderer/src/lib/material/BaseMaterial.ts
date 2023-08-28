import ArgumentOutOfRangeException from '../exceptions/ArgumentOutOfRangeException';
import { GL_FLOAT_MAT4, GL_FLOAT_VEC4 } from '../webgl.consts';
import BaseShader from './BaseShader';
import { Color, Matrix4, Vector2, Vector4 } from 'mathf';
import { Float32NativeArray, Int32NativeArray } from 'memory';

export enum UNIFORM_TYPE {
    MATRIX = GL_FLOAT_MAT4,
    VECTOR = GL_FLOAT_VEC4,
    COLOR = GL_FLOAT_VEC4,
}

export default class BaseMaterial {
    private readonly uniforms: { [key in UNIFORM_TYPE]: { [key: string]: Matrix4 | Vector4 | Color } } = {
        [UNIFORM_TYPE.COLOR]: {},
        [UNIFORM_TYPE.MATRIX]: {},
        [UNIFORM_TYPE.VECTOR]: {},
    };
    constructor(public shader: BaseShader) {
        for (const uniform of this.shader.getUniforms()) {
            if (uniform.webGLActiveInfo.type === UNIFORM_TYPE.MATRIX) {
                this.setMatrix(uniform.webGLActiveInfo.name, new Matrix4());
                continue;
            }

            if (uniform.webGLActiveInfo.type === UNIFORM_TYPE.VECTOR) {
                this.setVector(uniform.webGLActiveInfo.name, new Vector4());
            }
        }
    }

    setColor(name: string, value: Color): void {
        this.setUniform(UNIFORM_TYPE.COLOR, name, value);
    }

    getColor(name: string) {
        this.getUniform(UNIFORM_TYPE.COLOR, name);
    }

    setFloat(name: string, v: Float32NativeArray): void {}

    setInt(v: Int32NativeArray): void {}

    setMatrix(name: string, v: Matrix4): void {
        this.setUniform(UNIFORM_TYPE.MATRIX, name, v);
    }

    getMatrix(name: string): Matrix4 {
        return this.getUniform(UNIFORM_TYPE.MATRIX, name) as Matrix4;
    }

    setVector(name: string, v: Vector4): void {
        this.setUniform(UNIFORM_TYPE.VECTOR, name, v);
    }

    getVector(name: string): Vector4 {
        return this.getUniform(UNIFORM_TYPE.VECTOR, name) as Vector4;
    }

    public hasUniformByName(type: UNIFORM_TYPE, name: string) {
        return !!this.uniforms[type][name];
    }

    protected getUniform(type: UNIFORM_TYPE, name: string) {
        if (!this.hasUniformByName(type, name)) throw new ArgumentOutOfRangeException();
        return this.uniforms[type][name];
    }

    protected setUniform(type: UNIFORM_TYPE, name: string, value: Matrix4 | Vector4 | Color) {
        if (!this.hasUniformByName(type, name)) this.uniforms[type][name] = value;
        this.uniforms[type][name].set(value);
    }
}
