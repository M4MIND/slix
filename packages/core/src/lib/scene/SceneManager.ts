import Scene from './Scene';

export default class SceneManager {
    private activeScene?: Scene;

    createScene(name: string) {
        return new Scene(name);
    }

    setActiveScene(scene: Scene) {
        this.activeScene = scene;
    }

    getActiveScene(): Scene {
        return this.activeScene as Scene;
    }
}
