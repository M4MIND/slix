import MemoryServer from './lib/MemoryServer';
import type { MemoryServerInitConfigs } from './lib/MemoryServer';
import LinearAllocator from './lib/allocators/LinearAllocator';
import Float32NativeArray from './lib/array/Float32NativeArray';
import Int8NativeArray from './lib/array/Int8NativeArray';
import Int16NativeArray from './lib/array/Int16NativeArray';
import Int32NativeArray from './lib/array/Int32NativeArray';
import { Uint8NativeArray } from './lib/array/Uint8NativeArray';
import Uint16NativeArray from './lib/array/Uint16NativeArray';
import Uint32NativeArray from './lib/array/Uint32NativeArray';
import { DataType, FLOAT32, INT8, INT16, INT32, UINT8, UINT16, UINT32 } from './lib/types/DataType';
import type {
    DataTypeArguments,
    DataTypeConstructor,
    TYPED_ARRAY,
    TYPED_ARRAY_CONSTRUCTOR,
} from './lib/types/DataType';

export const Collection = {
    Float32NativeArray: Float32NativeArray,
    Int32NativeArray: Int32NativeArray,
    Int16NativeArray: Int16NativeArray,
    Int8NativeArray: Int8NativeArray,
    Uint8NativeArray: Uint8NativeArray,
    Uint16NativeArray: Uint16NativeArray,
    Uint32NativeArray: Uint32NativeArray,
};
export {
    DataType,
    DataTypeArguments,
    DataTypeConstructor,
    FLOAT32,
    INT16,
    INT32,
    INT8,
    LinearAllocator,
    MemoryServer,
    MemoryServerInitConfigs,
    TYPED_ARRAY,
    TYPED_ARRAY_CONSTRUCTOR,
    UINT16,
    UINT32,
    UINT8,
};
