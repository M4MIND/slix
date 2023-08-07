import BaseComponent from '../BaseComponent';
import { Matrix4 } from 'mathf';
import { BaseMaterial, BaseShader } from 'renderer';

export default class RendererComponent extends BaseComponent {
    enable = true;
    material: BaseMaterial | null = null;
    private _worldToLocalMatrix: Matrix4 = new Matrix4();
    private _localToWorldMatrix: Matrix4 = new Matrix4();
    private _cacheWorldToLocalMatrix: Matrix4 = new Matrix4();
    private _cacheLocalToWorldMatrix: Matrix4 = new Matrix4();

    public get worldToLocalMatrix(): Matrix4 {
        return this._worldToLocalMatrix;
    }

    public get localToWorldMatrix(): Matrix4 {
        return this._localToWorldMatrix;
    }
}
