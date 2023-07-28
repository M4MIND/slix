import { DataTypeArguments, DataTypeConstructor, UINT8 } from '../types/DataType';
import NativeArray from './NativeArray';

export default class Uint8NativeArray extends NativeArray {
    protected override dataType: DataTypeConstructor<DataTypeArguments> = UINT8;
}
