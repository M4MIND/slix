import BaseComponent from '../BaseComponent';
import Renderer from './Renderer';
import { BaseMaterial } from 'renderer';

export default class MeshRenderer extends Renderer {
    onRender() {
        console.dir(this.gameObject);
    }
}
