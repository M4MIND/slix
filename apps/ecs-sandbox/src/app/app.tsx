// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TestComponent } from './component/TestComponent';
import { TransformComponent } from './component/TransformComponent';
import { World, debugPrepare } from 'ecs';
import { useEffect } from 'react';
import { UISlix } from 'ui';

export function App() {
    useEffect(() => {
        UISlix.init();

        const world = new World();
        world.createSystems('EnginePreUpdate');
        world.createSystems('EngineAfterUpdate');
        world.registerComponent<TestComponent>(TestComponent).registerComponent<TransformComponent>(TransformComponent);
        //debugPrepare(world);
        world.init();

        world.newEntity().addComponent<TestComponent>(TestComponent).removeComponent<TestComponent>(TestComponent);
        world.newEntity().addComponent<TestComponent>(TestComponent);
        world.newEntity().addComponent<TestComponent>(TestComponent).addComponent(TransformComponent);
        world.newEntity().addComponent<TestComponent>(TestComponent).delete();
        world.newEntity().addComponent<TestComponent>(TestComponent);

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
