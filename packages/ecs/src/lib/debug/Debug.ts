import { World } from '../World';
import { DebugComponents } from './components/DebugComponents';
import { DebugEntities } from './entities/DebugEntities';
import { DebugSystems } from './systems/DebugSystems';
import { DebugUI } from './ui/DebugUI';

export const debugPrepare = (world: World) => {
    DebugUI.init();
    world
        .createSystems('Debug')
        .register(new DebugSystems())
        .register(new DebugEntities())
        .register(new DebugComponents());
};
