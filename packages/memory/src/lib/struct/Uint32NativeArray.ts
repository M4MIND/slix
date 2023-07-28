import { DataTypeArguments, DataTypeConstructor, UINT32 } from '../types/DataType';
import NativeArray from './NativeArray';

export default class Uint32NativeArray extends NativeArray {
    protected override dataType: DataTypeConstructor<DataTypeArguments> = UINT32;
}
