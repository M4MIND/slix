// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TestComponent } from './component/TestComponent';
import { TransformComponent } from './component/TransformComponent';
import { World, debugPrepare } from 'ecs';
import { useEffect } from 'react';

export function App() {
    useEffect(() => {
        const world = new World();
        world.createSystems('EnginePreUpdate');
        world.createSystems('EngineAfterUpdate');
        world.registerComponent<TestComponent>(TestComponent).registerComponent<TransformComponent>(TransformComponent);
        debugPrepare(world);

        world.init();

        console.dir(world);
        const loop = () => {
            world.run();
            requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.location.reload();
        };
    }, []);
    return (
        <div>
            <div id={'ecsDebug'}></div>
        </div>
    );
}

export default App;
