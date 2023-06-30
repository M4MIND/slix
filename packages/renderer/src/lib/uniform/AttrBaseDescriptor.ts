export default class AttrBaseDescriptor {
    constructor(
        public readonly index: number,
        public readonly name: string,
        public readonly type: number,
        public readonly size: number
    ) {}
}
