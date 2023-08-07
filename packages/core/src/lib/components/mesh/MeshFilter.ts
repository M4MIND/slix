import Mesh from '../../mesh/Mesh';
import BaseComponent from '../BaseComponent';

export default class MeshFilter extends BaseComponent {
    mesh: Mesh | null = null;
}
