export default class Shader {
    constructor(
        public readonly name: string,
        public readonly vertex: WebGLShader,
        public readonly fragment: WebGLShader
    ) {}
}
