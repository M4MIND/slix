// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TestSystem } from './systems/TestSystem';
import { EcsDebugComponents, EcsDebugEntity, EcsDebugSystems, EcsPrepareDebug, EcsSystems, EcsWorld } from 'ecs';
import { useEffect } from 'react';

export function App() {
    useEffect(() => {
        const world = new EcsWorld({});
        world.registerSystems(new EcsSystems(world), 'EnginePreUpdateSystems');
        world.registerSystems(new EcsSystems(world), 'UserSystem');
        world.registerSystems(new EcsSystems(world), 'EngineAfterUpdateSystems');
        world.registerSystems(EcsPrepareDebug(world), 'EcsDebugging');

        world.getSystems('EnginePreUpdateSystems').add(new TestSystem());

        world.initSystems();
        world.runSystems();
    }, []);
    return <div></div>;
}

export default App;
