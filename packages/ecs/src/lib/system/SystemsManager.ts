import { World } from '../World';
import { SystemsGroup } from './SystemsGroup';

export class SystemsManager {
    private allSystems: SystemsGroup[] = [];
    private allSystemKeys: string[] = [];
    private allSystemsMap: { [index: string]: SystemsGroup } = {};
    constructor(private readonly world: World) {}

    addSystems(systems: SystemsGroup, name: string) {
        this.allSystems.push(systems);
        this.allSystemKeys.push(name);
        this.allSystemsMap[name] = systems;

        return systems;
    }

    getSystemsByName(index: string) {
        return this.allSystemsMap[index];
    }

    getSystems() {
        return this.allSystems;
    }

    getSystemsKeys() {
        return this.allSystemKeys;
    }

    init() {
        for (const systems of this.allSystems) {
            systems.preInit();
        }

        for (const systems of this.allSystems) {
            systems.init();
        }
    }

    run() {
        for (const systems of this.allSystems) {
            systems.run();
        }

        for (const systems of this.allSystems) {
            systems.postRun();
        }
    }
}
