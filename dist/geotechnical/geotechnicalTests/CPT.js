export default class CPT {
    constructor(_layers, _inicialQuota) {
        this._layers = _layers;
        this._inicialQuota = _inicialQuota;
    }
    addHeightForEachLayer(layers, inicialQuota) {
        const deltayCPT = 0.2;
        layers.forEach((layer, index) => {
            layer.quota = inicialQuota + (deltayCPT * index);
        });
    }
}
