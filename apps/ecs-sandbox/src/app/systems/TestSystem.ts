import { EcsSystems, IEcsSystemPreInt, IEcsSystemRunnable } from 'ecs';

export class TestSystem implements IEcsSystemRunnable, IEcsSystemPreInt {
    readonly name: string = TestSystem.name;

    preInit(ecsSystems: EcsSystems) {}

    run(ecsSystems: EcsSystems): void {
        console.dir('Run test system');
    }
}
