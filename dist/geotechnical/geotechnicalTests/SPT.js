export default class SPT {
    constructor(_soilLayers, _config) {
        this._config = _config;
        const { inicialQuota } = _config;
        this._soilLayers = _soilLayers;
        this.addHeightForEachLayer(_soilLayers, inicialQuota);
    }
    get soilLayers() {
        return this._soilLayers;
    }
    get config() {
        return this._config;
    }
    addHeightForEachLayer(soilLayers, inicialQuota) {
        this._soilLayers.forEach((oneLayer, index) => {
            oneLayer.quota = inicialQuota + index;
        });
    }
    getSPTLayer(quote) {
        return this.soilLayers[Math.floor(quote) - 1].NSPT;
    }
}
// const reportSPT = new SPT([
//   { NSPT: 12, typeSoil: 'SM' },
//   { NSPT: 13, typeSoil: 'SM' },
//   { NSPT: 14, typeSoil: 'SM' },
//   { NSPT: 15, typeSoil: 'SM' },
//   { NSPT: 17, typeSoil: 'S' },
//   { NSPT: 19, typeSoil: 'S' }
// ],
// {
//   inicialQuota: 2,
//   waterLevel: 1.5
// })
