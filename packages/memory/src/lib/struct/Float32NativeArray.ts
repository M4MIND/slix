import { DataTypeArguments, DataTypeConstructor, FLOAT32 } from '../types/DataType';
import NativeArray from './NativeArray';

export default class Float32NativeArray extends NativeArray {
    protected override dataType: DataTypeConstructor<DataTypeArguments> = FLOAT32;
}
