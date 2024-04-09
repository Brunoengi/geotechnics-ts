export class AbstractStake {
    constructor({ inicialQuota, height }) {
        this._inicialQuota = inicialQuota;
        this._height = height;
    }
    get finalCote() {
        return this._inicialQuota + this._height;
    }
}
