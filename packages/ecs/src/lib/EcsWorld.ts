import { EcsSystems } from './system/EcsSystems';

type CONFIG = {
    entitiesDefault?: number;
    entityComponentsSize?: number;
};

const configDefault: CONFIG = {
    entitiesDefault: 512,
    entityComponentsSize: 512,
};
export class EcsWorld {
    private entitiesItemSize = 0;
    private entities: number[] = [];
    private allSystemsMap: { [index: string]: EcsSystems } = {};
    private allSystemsKeys: string[] = [];
    private allSystems: EcsSystems[] = [];
    constructor(configs: CONFIG = configDefault) {}

    registerSystems(systems: EcsSystems, systemsName: string) {
        if (this.allSystemsMap[systemsName] !== undefined) return this;
        this.allSystemsMap[systemsName] = systems;
        this.allSystems.push(systems);
        this.allSystemsKeys.push(systemsName);

        return this;
    }

    getSystems(systemsName: string) {
        return this.allSystemsMap[systemsName];
    }

    initSystems() {
        for (const systems of this.allSystems) {
            systems.init();
        }
    }

    runSystems() {
        for (const systems of this.allSystems) {
            systems.run();
        }
    }

    getAllSystems() {
        return this.allSystems;
    }

    getAllSystemsKeys() {
        return this.allSystemsKeys;
    }

    getAllSystemsMap() {
        return this.allSystemsMap;
    }
}
