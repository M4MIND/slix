import ArgumentOutOfRangeException from '../exceptions/ArgumentOutOfRangeException';
import Program from '../gpu/Program';
import { RendererServer } from './../RendererServer';
import { GL_MATH_TYPES, GL_SHADER_TYPES } from 'renderer';

type WEBGL_ATTRIBUTE_STORE = {
    index: number;
    name: string;
    webGLActiveInfo: WebGLActiveInfo;
};

type WEBGL_UNIFORM_STORE = {
    webGLUniformLocation: WebGLUniformLocation;
} & WEBGL_ATTRIBUTE_STORE;

export default class BaseShader {
    private attributes: { [index: string | number]: WEBGL_ATTRIBUTE_STORE } = {};
    private attributesCollection: WEBGL_ATTRIBUTE_STORE[] = [];
    private uniforms: { [index: string | number]: WEBGL_UNIFORM_STORE } = {};
    private uniformCollection: WEBGL_UNIFORM_STORE[] = [];
    private readonly countAttributes = 0;
    private readonly countUniforms = 0;

    constructor(public readonly name: string, private readonly program: Program) {
        for (const index of program.getActiveAttributes()) {
            const attr = program.getActiveAttribute(index);
            if (!attr) continue;
            program.enableVertexAttribute(index);

            this.attributes[index] = {
                index: index,
                name: attr.name,
                webGLActiveInfo: attr,
            };
            this.attributes[attr.name] = this.attributes[index];
            this.attributesCollection.push(this.attributes[index]);

            this.countAttributes++;
        }

        for (const index of program.getActiveUniforms()) {
            const uniform = program.getActiveUniform(index);

            if (!uniform) continue;

            const uniformLocation = this.program.getUniformLocation(uniform.name);

            if (!uniformLocation) continue;

            if (uniform && uniformLocation) {
                this.uniforms[index] = {
                    index: index,
                    name: uniform.name,
                    webGLActiveInfo: uniform,
                    webGLUniformLocation: uniformLocation,
                };
                this.uniforms[uniform.name] = this.uniforms[index];
                this.uniformCollection.push(this.uniforms[index]);

                this.countUniforms++;
            }
        }
    }

    getAttributes() {
        return this.attributesCollection;
    }

    getUniforms() {
        return this.uniformCollection;
    }

    getPropertyAttribute(attribute: number | string) {
        if (!this.attributes[attribute]) throw new ArgumentOutOfRangeException();
        return this.attributes[attribute];
    }

    getPropertyAttributeName(id: number) {
        return this.getPropertyAttribute(id).name;
    }

    getPropertyAttributeId(name: string) {
        if (!this.attributes[name]) throw new ArgumentOutOfRangeException();
        return this.attributes[name].index;
    }

    getPropertyUniform(attribute: number | string) {
        if (!this.uniforms[attribute]) throw new ArgumentOutOfRangeException();
        return this.uniforms[attribute];
    }

    getUniformLocationByName(name: string) {
        return this.getPropertyUniform(name).webGLUniformLocation;
    }

    getPropertyUniformName(id: number) {
        return this.getPropertyUniform(id).name;
    }

    getAttributeCount() {
        return this.countAttributes;
    }

    getUniformCount() {
        return this.countUniforms;
    }

    getAttributeType(index: number): GL_MATH_TYPES {
        if (!this.attributes[index]) throw new ArgumentOutOfRangeException();
        return this.attributes[index].webGLActiveInfo.type;
    }

    getUniformType(index: number): GL_MATH_TYPES {
        if (!this.uniforms[index]) throw new ArgumentOutOfRangeException();
        return this.uniforms[index].webGLActiveInfo.type;
    }

    use() {
        this.program.use();
    }

    link() {
        this.program.link();
    }

    public static find(name: string) {
        const shader = RendererServer.shaderManager.findShader(name);

        if (shader) return shader;

        throw new Error(`Can't find shader: ${name}`);
    }
}
