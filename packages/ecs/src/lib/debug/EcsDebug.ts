import { EcsWorld } from '../EcsWorld';
import {
    EcsSystems,
    IEcsSystem,
    IEcsSystemDestroy,
    IEcsSystemInit,
    IEcsSystemPosDestroy,
    IEcsSystemPostRunnable,
    IEcsSystemPreInt,
    IEcsSystemRunnable,
} from '../system/EcsSystems';

export class EcsDebugComponents implements IEcsSystem {
    name: string = EcsDebugComponents.name;
}

export class EcsDebugEntity implements IEcsSystem, IEcsSystemInit, IEcsSystemRunnable, IEcsSystemPreInt {
    readonly name: string = EcsDebugEntity.name;

    init(ecsSystems: EcsSystems): void {}

    preInit(ecsSystems: EcsSystems): void {}

    run(ecsSystems: EcsSystems): void {}
}

export class EcsDebugSystems implements IEcsSystemInit, IEcsSystemPreInt, IEcsSystemPostRunnable, IEcsSystemRunnable {
    private wrapper: HTMLDivElement = document.createElement('div');
    private title: HTMLDivElement = document.createElement('div');
    private body: HTMLDivElement = document.createElement('div');
    private systems: { [index: string]: { wrapper: HTMLDivElement; title: HTMLDivElement; body: HTMLDivElement } } = {};
    readonly name: string = EcsDebugSystems.name;
    private widget!: EcsWidget;
    newWidget!: EcsWidget;

    preInit(ecsSystems: EcsSystems) {
        this.widget = EcsDebugWrapper.createWidget(`${EcsDebugSystems.name}`);
    }

    init(ecsSystems: EcsSystems): void {
        const systemsMap = ecsSystems.defaultWorld.getAllSystemsMap();
        for (const systemKey of Object.keys(systemsMap)) {
            const system = ecsSystems.defaultWorld.getSystems(systemKey);
            const systemInfoWrapper = document.createElement('div');
            const systemInfoTitle = document.createElement('div');
            const body = document.createElement('div');

            systemInfoTitle.style.fontSize = '0.8rem';
            systemInfoTitle.style.color = '#CCC';
            systemInfoTitle.style.marginBottom = '0.6em';
            systemInfoTitle.style.padding = '0.4em 0.6em';
            systemInfoTitle.style.backgroundColor = 'rgba(0,0,0,0.3)';
            systemInfoTitle.style.borderRadius = '0.4em';
            systemInfoTitle.style.textAlign = 'left';
            systemInfoTitle.style.cursor = 'pointer';
            systemInfoTitle.innerText = systemKey;

            for (const i of system.getAllSystemsList()) {
                const systemWrapper = document.createElement('div');
                const systemWrapperTitle = document.createElement('div');
                const tagsWrapper = document.createElement('div');
                const title = document.createElement('div');

                tagsWrapper.style.display = 'flex';
                tagsWrapper.style.marginLeft = '1em';

                if ((i as IEcsSystemPreInt).preInit !== undefined)
                    tagsWrapper.appendChild(this.createTag('preInit', '#0ac7fb'));
                if ((i as IEcsSystemInit).init !== undefined)
                    tagsWrapper.appendChild(this.createTag('init', '#0ac7fb'));
                if ((i as IEcsSystemRunnable).run !== undefined)
                    tagsWrapper.appendChild(this.createTag('run', 'rgb(60,209,136)'));
                if ((i as IEcsSystemPostRunnable).postRun !== undefined)
                    tagsWrapper.appendChild(this.createTag('postRun', 'rgb(60,209,136)'));
                if ((i as IEcsSystemDestroy).destroy !== undefined)
                    tagsWrapper.appendChild(this.createTag('destroy', '#f7666e'));
                if ((i as IEcsSystemPosDestroy).postDestroy !== undefined)
                    tagsWrapper.appendChild(this.createTag('postDestroy', '#f7666e'));

                systemWrapper.style.color = '#eee';
                systemWrapper.style.fontSize = '0.8em';
                systemWrapper.style.marginBottom = '0.8em';
                systemWrapper.style.marginLeft = '0.6em';

                systemWrapperTitle.style.display = 'flex';
                systemWrapperTitle.style.flexDirection = 'row';
                systemWrapperTitle.style.alignItems = 'center';
                systemWrapperTitle.style.justifyContent = 'space-between';

                title.innerText = `${i.name}`;

                systemWrapperTitle.appendChild(title);
                systemWrapperTitle.appendChild(tagsWrapper);
                systemWrapper.appendChild(systemWrapperTitle);
                body.appendChild(systemWrapper);
            }

            this.systems[systemKey] = {
                wrapper: systemInfoWrapper,
                title: systemInfoTitle,
                body: body,
            };

            systemInfoWrapper.appendChild(systemInfoTitle);
            systemInfoWrapper.appendChild(body);

            this.widget.append(systemInfoWrapper);
        }
    }

    private createTag(name: string, color: string) {
        const tag = document.createElement('div');
        tag.style.padding = '0.1em 0.3em';
        tag.style.backgroundColor = color;
        tag.style.fontSize = '0.9em';
        tag.style.borderRadius = '0.3em';
        tag.style.marginLeft = '0.2em';
        tag.style.color = 'white';
        tag.innerText = name;

        return tag;
    }

    run(ecsSystems: EcsSystems): void {}

    postRun(ecsSystems: EcsSystems): void {}
}

class EcsWidget {
    public readonly widget: HTMLDivElement = document.createElement('div');
    private title: HTMLDivElement;
    private body: HTMLDivElement;
    constructor(name: string) {
        this.title = document.createElement('div');
        this.body = document.createElement('div');

        this.widget.style.maxHeight = '30vh';
        this.widget.style.padding = '12px';
        this.widget.style.fontSize = '16px';
        this.widget.style.borderRadius = '4px';
        this.widget.style.backgroundColor = '#333';
        this.widget.style.fontFamily = 'Tahoma,Verdana,Segoe,sans-serif';
        this.widget.style.marginRight = '1em';
        this.widget.style.boxShadow = '1px 3px 3px 3px rgba(0,0,0,0.1)';

        this.title.style.paddingBottom = '8px';
        this.title.style.marginBottom = '8px';
        this.title.style.borderBottom = '1px solid rgba(255,255,255,.2)';
        this.title.style.color = '#F4F4F4';
        this.title.style.fontSize = '1.05rem';
        this.title.innerText = 'Viewer Systems';
        this.title.innerText = name;

        this.widget.appendChild(this.title);
        this.widget.appendChild(this.body);
    }

    append(element: HTMLElement) {
        this.body.appendChild(element);
    }
}
class EcsDebugWrapper {
    static wrapper: HTMLDivElement = document.createElement('div');
    static widgets: EcsWidget[] = [];
    static init() {
        this.wrapper.style.position = 'fixed';
        this.wrapper.style.display = 'flex';
        this.wrapper.style.flexDirection = 'row';

        const container = document.getElementById('root');

        if (container !== null) {
            container.appendChild(this.wrapper);
        }
    }

    static createWidget(name: string) {
        const widget = new EcsWidget(name);

        this.wrapper.appendChild(widget.widget);
        this.widgets.push(widget);

        return widget;
    }
}

export function EcsPrepareDebug(ecsWorld: EcsWorld) {
    EcsDebugWrapper.init();
    return new EcsSystems(ecsWorld).add(new EcsDebugSystems()).add(new EcsDebugComponents()).add(new EcsDebugEntity());
}
