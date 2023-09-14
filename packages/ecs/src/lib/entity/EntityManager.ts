import { World } from '../World';
import { Entity } from './Entity';

export class EntityManager {
    private entities: Entity[];
    private entitiesCount = 0;
    private entitiesLength: number;
    private recycledEntities: Entity[];
    private recycledEntitiesCount = 0;
    private recycledEntitiesLength: number;
    public readonly entitiesInWorld: Set<Entity> = new Set();

    constructor(private readonly world: World, size = 512) {
        this.entities = new Array<Entity>(size);
        this.recycledEntities = new Array<Entity>(size);

        this.recycledEntitiesLength = this.recycledEntities.length;
        this.entitiesLength = this.entities.length;

        for (let i = this.entitiesCount; i < this.entitiesLength; i++) {
            this.entities[i] = new Entity(i, world);
        }
    }

    new() {
        let entity: Entity;

        if (this.recycledEntitiesCount > 0) {
            entity = this.recycledEntities[--this.recycledEntitiesCount];
        } else {
            entity = this.entities[this.entitiesCount++];
            if (this.entitiesCount === this.entitiesLength) {
                this.entitiesLength = this.entitiesCount << 1;
                this.entities.length = this.entitiesLength;

                for (let i = this.entitiesCount; i < this.entitiesLength; i++) {
                    this.entities[i] = new Entity(i, this.world);
                }
            }
        }

        this.entitiesInWorld.add(entity);

        return entity;
    }

    delete(entity: Entity) {
        this.entitiesInWorld.delete(entity);
    }
}