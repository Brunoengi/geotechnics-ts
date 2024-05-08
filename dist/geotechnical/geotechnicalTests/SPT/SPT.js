import abstractTest from '../abstractTest.js';
import { findIndexMinimalDiferencePosition } from '../../../utils/Find.js';
export default class SPT extends abstractTest {
    constructor(_soilLayers, _config) {
        super();
        this._config = _config;
        this._maxNSPT = 50;
        const { inicialQuota } = _config;
        this._soilLayers = _soilLayers;
        this.addHeightForEachLayer(_soilLayers, inicialQuota);
        this.setMaxNSPT(this._soilLayers);
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
    getQuotaLayers() {
        return this._soilLayers.map(layer => layer.quota);
    }
    getLayerByQuote(quote) {
        const allQuotaLayers = this.getQuotaLayers();
        const index = findIndexMinimalDiferencePosition(quote, allQuotaLayers, (0.5 - 0.000001));
        return this._soilLayers[index];
    }
    setMaxNSPT(soilLayers) {
        soilLayers.forEach(layer => {
            if (layer.NSPT >= this._maxNSPT)
                layer.NSPT = this._maxNSPT;
        });
    }
}
