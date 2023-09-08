import { ISystemInit, ISystemRun } from '../../system/ISystem';
import { SystemsGroup } from '../../system/SystemsGroup';
import { DebugUI } from '../ui/DebugUI';
import { UICard } from '../ui/card/UICard';

export class DebugEntities implements ISystemInit, ISystemRun {
    private card = new UICard('debug entities');
    init(systems: SystemsGroup): void {
        DebugUI.append(this.card);
    }

    run(systems: SystemsGroup): void {}
}
