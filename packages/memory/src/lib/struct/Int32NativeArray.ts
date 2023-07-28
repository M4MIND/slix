import { DataTypeArguments, DataTypeConstructor, INT32 } from '../types/DataType';
import NativeArray from './NativeArray';

export default class Int32NativeArray extends NativeArray {
    protected override dataType: DataTypeConstructor<DataTypeArguments> = INT32;
}
