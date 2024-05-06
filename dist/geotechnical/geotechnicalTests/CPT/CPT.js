import abstractTest from '../abstractTest.js';
import { findIndexMinimalDiferencePosition } from '../../../utils/Math.js';
export default class CPT extends abstractTest {
    constructor(soilLayers, _inicialQuota) {
        super();
        this._soilLayers = soilLayers;
        this.addHeightForEachLayer(soilLayers, _inicialQuota);
    }
    addHeightForEachLayer(layers, inicialQuota) {
        const deltayCPT = 0.2;
        layers.forEach((layer, index) => {
            this._soilLayers[index].quota = inicialQuota + (deltayCPT * index);
        });
    }
    get soilLayers() {
        return this._soilLayers;
    }
    get inicialQuota() {
        return this._inicialQuota;
    }
    getQcLayerByQuote(quote) {
        const index = this.getIndexByQuote(quote);
        return this._soilLayers[index].qc;
    }
    getLayerByQuote(quote) {
        const index = this.getIndexByQuote(quote);
        return this._soilLayers[index];
    }
    getIndexByQuote(quote) {
        const allQuotaLayers = this._soilLayers.map(layer => layer.quota);
        return findIndexMinimalDiferencePosition(quote, allQuotaLayers, (0.1 - 0.000001));
    }
}
