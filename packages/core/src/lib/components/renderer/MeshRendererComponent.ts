import RendererComponent from './RendererComponent';

export default class MeshRendererComponent extends RendererComponent {
    onRender() {
        console.dir(this.gameObject);
    }
}
