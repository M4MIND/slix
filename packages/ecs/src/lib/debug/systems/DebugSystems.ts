import { ISystemInit } from '../../system/ISystem';
import { SystemsGroup } from '../../system/SystemsGroup';
import { DebugUI } from '../ui/DebugUI';
import { UICard } from '../ui/card/UICard';

export class DebugSystems implements ISystemInit {
    init(systems: SystemsGroup): void {
        DebugUI.append(new UICard('Debug systems'));
    }
}