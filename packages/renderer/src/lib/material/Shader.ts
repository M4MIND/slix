import Program from '../gpu/Program';
import { RendererServer } from './../RendererServer';

type WEBGL_ATTRIBUTE_STORE = {
    index: number;
    name: string;
    webGLActiveInfo: WebGLActiveInfo;
};

type WEBGL_UNIFORM_STORE = {
    webGLUniformLocation: WebGLUniformLocation;
} & WEBGL_ATTRIBUTE_STORE;

export default class Shader {
    private attributes: { [index: string | number]: WEBGL_ATTRIBUTE_STORE } = {};
    private uniforms: { [index: string | number]: WEBGL_UNIFORM_STORE } = {};
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
            this.attributes[attr.name] = {
                index: index,
                name: attr.name,
                webGLActiveInfo: attr,
            };
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
                this.uniforms[uniform.name] = {
                    index: index,
                    name: uniform.name,
                    webGLActiveInfo: uniform,
                    webGLUniformLocation: uniformLocation,
                };
                this.countUniforms++;
            }
        }
    }

    getPropertyAttribute(attribute: number | string) {
        return this.attributes[attribute];
    }

    getPropertyAttributeName(id: number) {
        return this.getPropertyAttribute(id).name;
    }

    getPropertyAttributeId(name: string) {
        return this.attributes[name].index;
    }

    getPropertyUniform(attribute: number | string) {
        return this.uniforms[attribute];
    }

    getUniformLocationByName(name: string) {
        return this.uniforms[name].webGLUniformLocation;
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
