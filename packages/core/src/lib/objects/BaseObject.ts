export default class BaseObject {
    private _instanceID = 0;

    public get hashCode() {
        return this._instanceID;
    }

    public get instanceID() {
        return this._instanceID;
    }
}
