export abstract class DataType {
    abstract readonly byteSize: number;
}

export class FLOAT32 extends DataType {
    byteSize = 4;
}

export class INT16 extends DataType {
    byteSize = 2;
}

export class INT32 extends DataType {
    byteSize = 4;
}

export class INT8 extends DataType {
    byteSize = 1;
}

export class UINT16 extends DataType {
    byteSize = 2;
}

export class UINT32 extends DataType {
    byteSize = 4;
}

export class UINT8 extends DataType {
    byteSize = 1;
}
