export default class SPT {
    constructor(soilLayers, { inicialQuota, waterLevel }) {
        this.addHeightForEachLayer(soilLayers, inicialQuota);
        this._soilLayers = soilLayers;
        this._config = {
            waterLevel: waterLevel,
            inicialQuota: inicialQuota
        };
    }
    get soilLayer() {
        return this._soilLayers;
    }
    get config() {
        return this._config;
    }
    addHeightForEachLayer(soilLayers, inicialQuota) {
        soilLayers.forEach((oneLayer, index) => {
            oneLayer['quota'] = inicialQuota + index;
        });
    }
    getSPTLayer(quote) {
        return this._soilLayers[Math.floor(quote) - 1].NSPT;
    }
}
const reportSPT = new SPT([
    { NSPT: 12, typeSoil: 'SM' },
    { NSPT: 13, typeSoil: 'SM' },
    { NSPT: 14, typeSoil: 'SM' },
    { NSPT: 15, typeSoil: 'SM' },
    { NSPT: 17, typeSoil: 'S' },
    { NSPT: 19, typeSoil: 'S' }
], {
    inicialQuota: 2,
    waterLevel: 1.5,
});
