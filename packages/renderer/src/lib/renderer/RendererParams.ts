import MaterialPropertyBlock from './MaterialPropertyBlock';

export default class RendererParams {
    public materialPropertyBlock: MaterialPropertyBlock;
    constructor() {
        this.materialPropertyBlock = new MaterialPropertyBlock();
    }
}
