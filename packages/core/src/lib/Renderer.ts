import { Camera } from '../index';
import Material from './material/Material';
import Mesh from './mesh/Mesh';
import { RendererServer } from 'renderer';

export default class Renderer {
    static startUp() {}
    static drawMesh(mesh: Mesh, material: Material, camera: Camera) {
        // RendererServer.graphicsManager.renderMesh(mesh, material);
    }
}
