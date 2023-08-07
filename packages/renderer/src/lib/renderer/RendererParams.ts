import BaseMaterial from '../material/BaseMaterial';
import MaterialPropertyBlock from './MaterialPropertyBlock';

export default class RendererParams {
    public readonly materialPropertyBlock: MaterialPropertyBlock = new MaterialPropertyBlock();
    constructor(public material: BaseMaterial) {}
}
