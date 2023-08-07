import Renderer from './Renderer';

export default class MeshRenderer extends Renderer {
    onRender() {
        console.dir(this.gameObject);
    }
}
