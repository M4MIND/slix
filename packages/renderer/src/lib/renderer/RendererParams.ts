import MaterialPropertyBlock from './MaterialPropertyBlock';
import Material from '../material/Material';

export default class RendererParams {
    public materialPropertyBlock: MaterialPropertyBlock;
    constructor(public material: Material) {
        this.materialPropertyBlock = new MaterialPropertyBlock();
    }
}
