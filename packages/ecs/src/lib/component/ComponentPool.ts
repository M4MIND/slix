import { Entity } from '../entity/Entity';
import { ComponentAttachedException } from '../exceptions/component/ComponentAttachedException';
import { ComponentDeleteException } from '../exceptions/component/ComponentDeleteException';
import { ComponentGetException } from '../exceptions/component/ComponentGetException';
import { IComponentReset } from './IComponent';

export class ComponentPool<T> {
    private denseItems: T[];
    private denseItemsLength: number;
    private denseItemsCount = 1;
    private sparseItems: number[];
    private recycledItems: number[];
    private recycledItemsCount = 0;
    private recycledItemsLength = 0;

    constructor(private readonly component: COMPONENT<object>, size = 512) {
        this.denseItems = new Array<T>(size + 1).fill(new component() as T);
        this.sparseItems = new Array<number>(size);
        this.recycledItems = new Array<number>(size);

        this.denseItemsLength = this.denseItems.length;
        this.recycledItemsLength = this.recycledItems.length;
    }

    add(entity: Entity) {
        if (this.sparseItems[entity.id] > 0) throw new ComponentAttachedException(this.component.name, entity.id);

        let idx: number;

        if (this.recycledItemsCount > 0) {
            idx = this.recycledItems[--this.recycledItemsCount];
        } else {
            idx = this.denseItemsCount;
            if (this.denseItemsCount === this.denseItemsLength) {
                this.denseItemsLength = this.denseItemsLength << 1;
                this.denseItems.length = this.denseItemsLength;

                this.denseItems.fill(new this.component() as T, this.denseItemsCount, this.denseItemsLength);
            }
            this.denseItemsCount++;
        }

        return this.denseItems[idx];
    }

    get(entity: Entity): T {
        if (!this.has(entity)) throw new ComponentGetException(this.component.name, entity.id);
        return this.denseItems[this.sparseItems[entity.id]];
    }

    has(entity: Entity): boolean {
        return this.sparseItems[entity.id] > 0;
    }

    delete(entity: Entity) {
        if (!this.has(entity)) throw new ComponentDeleteException(this.component.name);

        const sparseData = this.sparseItems[entity.id];

        if (this.recycledItemsCount === this.recycledItemsLength) {
            this.recycledItemsLength = this.recycledItemsCount << 1;
            this.recycledItems.length = this.recycledItemsLength;
        }

        this.recycledItems[this.recycledItemsCount++] = sparseData;

        if ((this.denseItems[sparseData] as IComponentReset).reset)
            (this.denseItems[sparseData] as IComponentReset).reset();

        this.sparseItems[entity.id] = 0;
    }
}

export type COMPONENT<T> = { new (): T; id?: number };
