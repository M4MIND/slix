import { GL_BUFFERS, GL_USAGE_BUFFER } from '../consts';

import GpuBuffer16Int from './GpuBuffer16Int';
import GpuBuffer32Float from './GpuBuffer32Float';
import GpuBuffer32Int from './GpuBuffer32Int';
import GpuBuffer64Float from './GpuBuffer64Float';
import GpuBuffer8Int from './GpuBuffer8Int';
import GpuBufferBase from './GpuBufferBase';
import RendererServer from '../RendererServer';

export default class GpuBuffer {
    public static create8Int(type: GL_BUFFERS, usage: GL_USAGE_BUFFER) {
        return new GpuBuffer8Int(GpuBuffer.createBuffer(), type, usage);
    }

    public static create16Int(type: GL_BUFFERS, usage: GL_USAGE_BUFFER) {
        return new GpuBuffer16Int(GpuBuffer.createBuffer(), type, usage);
    }

    public static create32Int(type: GL_BUFFERS, usage: GL_USAGE_BUFFER) {
        return new GpuBuffer32Int(GpuBuffer.createBuffer(), type, usage);
    }

    public static create32Float(type: GL_BUFFERS, usage: GL_USAGE_BUFFER) {
        return new GpuBuffer32Float(GpuBuffer.createBuffer(), type, usage);
    }

    public static create64Float(type: GL_BUFFERS, usage: GL_USAGE_BUFFER) {
        return new GpuBuffer64Float(GpuBuffer.createBuffer(), type, usage);
    }

    private static createBuffer() {
        return RendererServer.getContextManager().createBuffer();
    }

    public static setBufferData(buffer: GpuBufferBase) {
        RendererServer.getContextManager().bufferData(buffer);
    }
    
    public static bindBuffer(buffer: GpuBufferBase) {
        RendererServer.getContextManager().bindBuffer(buffer);
    }
}
