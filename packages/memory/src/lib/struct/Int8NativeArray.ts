import { DataTypeArguments, DataTypeConstructor, INT8 } from '../types/DataType';
import NativeArray from './NativeArray';

export default class Int8NativeArray extends NativeArray {
    protected override dataType: DataTypeConstructor<DataTypeArguments> = INT8;
}
