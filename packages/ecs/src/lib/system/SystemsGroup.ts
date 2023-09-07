import { World } from '../World';
import { ISystem, ISystemInit, ISystemPostRun, ISystemPreInit, ISystemRun } from './ISystem';

export class SystemsGroup {
    get allSystems(): ISystem[] {
        return this._allSystems;
    }
    get allSystemsRun(): ISystemRun[] {
        return this._allSystemsRun;
    }
    get allSystemsPostRun(): ISystemPostRun[] {
        return this._allSystemsPostRun;
    }
    get world() {
        return this._world;
    }

    private _allSystems: ISystem[];
    private _allSystemsRun: ISystemRun[];
    private _allSystemsPostRun: ISystemPostRun[];
    constructor(private readonly _world: World) {
        this._allSystems = new Array<ISystem>();
        this._allSystemsRun = new Array<ISystemRun>();
        this._allSystemsPostRun = new Array<ISystemPostRun>();
    }

    register(system: ISystem) {
        this._allSystems.push(system);

        if ((system as ISystemRun).run !== undefined) this._allSystemsRun.push(system as ISystemRun);
        if ((system as ISystemPostRun).postRun !== undefined) this._allSystemsPostRun.push(system as ISystemPostRun);

        return this;
    }

    init() {
        for (const system of this._allSystems) {
            if ((system as ISystemInit).init) (system as ISystemInit).init(this);
        }
    }

    preInit() {
        for (const system of this._allSystems) {
            if ((system as ISystemPreInit).preInit) (system as ISystemPreInit).preInit(this);
        }
    }

    run() {
        for (const system of this._allSystemsRun) {
            system.run(this);
        }
    }

    postRun() {
        for (const system of this._allSystemsPostRun) {
            system.postRun(this);
        }
    }
}
