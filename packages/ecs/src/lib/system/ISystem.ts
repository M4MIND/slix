// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { SystemsGroup } from './SystemsGroup';

export interface ISystem {}
export interface ISystemDestroy extends ISystem {
    destroy(): void;
}

export interface ISystemInit extends ISystem {
    init(systems: SystemsGroup): void;
}

export interface ISystemPostDestroy extends ISystem {
    postDestroy(systems: SystemsGroup): void;
}

export interface ISystemPostRun extends ISystem {
    postRun(systems: SystemsGroup): void;
}

export interface ISystemPreInit extends ISystem {
    preInit(systems: SystemsGroup): void;
}

export interface ISystemRun extends ISystem {
    run(systems: SystemsGroup): void;
}
