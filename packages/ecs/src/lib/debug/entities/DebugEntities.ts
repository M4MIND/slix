import { ISystemInit, ISystemRun } from '../../system/ISystem';
import { SystemsGroup } from '../../system/SystemsGroup';
import { DebugUI } from '../ui/DebugUI';
import { UICard } from '../ui/card/UICard';
import { UIList } from '../ui/list/UIList';
import { UIText } from '../ui/text/UIText';

export class DebugEntities implements ISystemInit, ISystemRun {
    private card = new UICard('debug entities');
    private list = new UIList();
    init(systems: SystemsGroup): void {
        DebugUI.append(this.card);
        this.card.body.append(this.list);

        systems.world.subscribeEvent('addEntity', (entity) => {
            this.list.add(entity.id, `Entity:  id{${entity.id.toString()}}`);
        });

        systems.world.subscribeEvent('removeEntity', (entity) => {
            this.list.delete(entity.id);
        });
    }

    run(systems: SystemsGroup): void {}
}
