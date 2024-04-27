import abstractTest from '../abstractTest.js';
export default class SPT extends abstractTest {
    constructor(_soilLayers, _config) {
        super();
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
        soilLayers.forEach((oneLayer, index) => {
            this._soilLayers[index].quota = inicialQuota + index;
        });
    }
    getSPTLayer(quote) {
        return this.soilLayers[Math.floor(quote) - 1].NSPT;
    }
}
