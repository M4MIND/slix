import { DataTypeArguments, DataTypeConstructor, INT16 } from '../types/DataType';
import NativeArray from './NativeArray';

export default class Int16NativeArray extends NativeArray {
    protected override dataType: DataTypeConstructor<DataTypeArguments> = INT16;
}
