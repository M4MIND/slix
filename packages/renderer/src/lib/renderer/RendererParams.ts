import Material from '../material/Material';
import MaterialPropertyBlock from './MaterialPropertyBlock';

export default class RendererParams {
    public readonly materialPropertyBlock: MaterialPropertyBlock = new MaterialPropertyBlock();
    constructor(public material: Material) {}
}
