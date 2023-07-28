import { DataTypeArguments, DataTypeConstructor, UINT16 } from '../types/DataType';
import NativeArray from './NativeArray';

export default class Uint16NativeArray extends NativeArray {
    protected override dataType: DataTypeConstructor<DataTypeArguments> = UINT16;
}
