export default class BaseObject {
    private _instanceID = self.crypto.randomUUID();

    public get hashCode() {
        return this._instanceID;
    }

    public get instanceID() {
        return this._instanceID;
    }
}
