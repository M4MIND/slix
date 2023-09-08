import { ISystemInit, ISystemRun } from '../../system/ISystem';
import { SystemsGroup } from '../../system/SystemsGroup';

export class DebugEntities implements ISystemInit, ISystemRun {
    private wrapper = document.createElement('div');
    init(systems: SystemsGroup): void {
        document.body.appendChild(this.wrapper);
    }

    run(systems: SystemsGroup): void {
        this.wrapper.innerText = '';

        systems.world.newEntity();

        for (const i of systems.world.getEntitiesInWorld()) {
            this.wrapper.innerText += `{${i.id}} `;
        }
    }
}
