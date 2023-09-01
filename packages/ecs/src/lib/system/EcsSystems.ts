import { EcsWorld } from '../EcsWorld';
import { a } from 'vitest/dist/types-198fd1d9';

export function EcsIsSystemInit(obj: IEcsSystem): obj is IEcsSystemInit {
    return (obj as IEcsSystemInit).init !== undefined;
}

export function EcsIsSystemPostRun(obj: IEcsSystem): obj is IEcsSystemPostRunnable {
    return (obj as IEcsSystemPostRunnable).postRun !== undefined;
}

export function EcsIsSystemPreInit(obj: IEcsSystem): obj is IEcsSystemPreInt {
    return (obj as IEcsSystemPreInt).preInit !== undefined;
}

export function EcsIsSystemRun(obj: IEcsSystem): obj is IEcsSystemRunnable {
    return (obj as IEcsSystemRunnable).run !== undefined;
}

export class EcsSystems {
    private readonly allSystems: IEcsSystem[] = [];
    private readonly allRunnableSystem: IEcsSystemRunnable[] = [];
    private readonly allPostRunnableSystems: IEcsSystemPostRunnable[] = [];

    constructor(public readonly defaultWorld: EcsWorld) {}
    add(system: IEcsSystem) {
        this.allSystems.push(system);

        if (EcsIsSystemRun(system)) {
            this.allRunnableSystem.push(system as IEcsSystemRunnable);
        }

        if (EcsIsSystemPostRun(system)) {
            this.allPostRunnableSystems.push(system as IEcsSystemPostRunnable);
        }

        return this;
    }

    init() {
        for (const system of this.allSystems) {
            if (!EcsIsSystemPreInit(system)) continue;
            (system as IEcsSystemPreInt).preInit(this);
        }

        for (const system of this.allSystems) {
            if (!EcsIsSystemInit(system)) continue;
            (system as IEcsSystemInit).init(this);
        }
    }

    run() {
        for (const system of this.allRunnableSystem) {
            system.run(this);
        }

        for (const system of this.allPostRunnableSystems) {
            system.postRun(this);
        }
    }

    getAllSystemsList() {
        return this.allSystems;
    }
}

export interface IEcsSystem {
    readonly name: string;
}

export interface IEcsSystemDestroy extends IEcsSystem {
    destroy(): void;
}
export interface IEcsSystemEvents extends IEcsSystem {
    onEntityAdded(entity: any): void;
    onEntityRemoved(entity: any): void;
}

export interface IEcsSystemInit extends IEcsSystem {
    init(ecsSystems: EcsSystems): void;
}
export interface IEcsSystemPosDestroy extends IEcsSystem {
    postDestroy(): void;
}

export interface IEcsSystemPostRunnable extends IEcsSystem {
    postRun(ecsSystems: EcsSystems): void;
}

export interface IEcsSystemPreInt extends IEcsSystem {
    preInit(ecsSystems: EcsSystems): void;
}

export interface IEcsSystemRunnable extends IEcsSystem {
    run(ecsSystems: EcsSystems): void;
}
