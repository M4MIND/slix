import CameraComponent from './../components/camera/CameraComponent';
import GameObject from './GameObject';

export default class Camera extends GameObject {
    constructor() {
        super();
        this.addComponent<CameraComponent>(CameraComponent);
    }
}
