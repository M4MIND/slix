import { World } from '../World';
import { DebugComponents } from './components/DebugComponents';
import { DebugEntities } from './entities/DebugEntities';
import { DebugSystems } from './systems/DebugSystems';

export const debugPrepare = (world: World) => {
    world
        .createSystems('Debug')
        .register(new DebugSystems())
        .register(new DebugEntities())
        .register(new DebugComponents());
};
