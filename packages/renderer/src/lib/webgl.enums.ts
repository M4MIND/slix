import {
    GL_ACTIVE_ATTRIBUTES,
    GL_ACTIVE_UNIFORMS,
    GL_ACTIVE_UNIFORM_BLOCKS,
    GL_ARRAY_BUFFER,
    GL_ATTACHED_SHADERS,
    GL_COMPILE_STATUS,
    GL_DELETE_STATUS,
    GL_DYNAMIC_COPY,
    GL_DYNAMIC_DRAW,
    GL_ELEMENT_ARRAY_BUFFER,
    GL_FLOAT_MAT2,
    GL_FLOAT_MAT3,
    GL_FLOAT_MAT4,
    GL_FLOAT_VEC2,
    GL_FLOAT_VEC3,
    GL_FLOAT_VEC4,
    GL_FRAGMENT_SHADER,
    GL_LINK_STATUS,
    GL_SHADER_TYPE,
    GL_STATIC_COPY,
    GL_STATIC_DRAW,
    GL_STATIC_READ,
    GL_STREAM_COPY,
    GL_STREAM_DRAW,
    GL_STREAM_READ,
    GL_TRANSFORM_FEEDBACK_BUFFER_MODE,
    GL_TRANSFORM_FEEDBACK_VARYINGS,
    GL_VALIDATE_STATUS,
    GL_VERTEX_SHADER,
} from './webgl.consts';

export enum GL_BUFFER_TARGET {
    ARRAY_BUFFER = GL_ARRAY_BUFFER,
    ELEMENT_ARRAY_BUFFER = GL_ELEMENT_ARRAY_BUFFER,
}

export enum GL_MATH_TYPES {
    FLOAT_MAT_2 = GL_FLOAT_MAT2,
    FLOAT_MAT_3 = GL_FLOAT_MAT3,
    FLOAT_MAT_4 = GL_FLOAT_MAT4,
    FLOAT_VEC2 = GL_FLOAT_VEC2,
    FLOAT_VEC3 = GL_FLOAT_VEC3,
    FLOAT_VEC4 = GL_FLOAT_VEC4,
}

export enum GL_PROGRAM_PARAMETERS {
    DELETE = GL_DELETE_STATUS,
    LINK = GL_LINK_STATUS,
    validate = GL_VALIDATE_STATUS,
    attached = GL_ATTACHED_SHADERS,
    active_attrib = GL_ACTIVE_ATTRIBUTES,
    active_uniforms = GL_ACTIVE_UNIFORMS,
    transform_feedback_buffer_mode = GL_TRANSFORM_FEEDBACK_BUFFER_MODE,
    transform_feedback_varyings = GL_TRANSFORM_FEEDBACK_VARYINGS,
    active_uniform_blocks = GL_ACTIVE_UNIFORM_BLOCKS,
}

export enum GL_SHADER_STATUSES {
    delete = GL_DELETE_STATUS,
    compile = GL_COMPILE_STATUS,
    type = GL_SHADER_TYPE,
}

export enum GL_SHADER_TYPES {
    vertex = GL_VERTEX_SHADER,
    fragment = GL_FRAGMENT_SHADER,
}

export enum GL_USAGE_BUFFER {
    STATIC_DRAW = GL_STATIC_DRAW,
    DYNAMIC_DRAW = GL_DYNAMIC_DRAW,
    STREAM_DRAW = GL_STREAM_DRAW,
    STATIC_READ = GL_STATIC_READ,
    DYNAMIC_READ = GL_STATIC_READ,
    STREAM_READ = GL_STREAM_READ,
    STATIC_COPY = GL_STATIC_COPY,
    DYNAMIC_COPY = GL_DYNAMIC_COPY,
    STREAM_COPY = GL_STREAM_COPY,
}
