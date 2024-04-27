import abstractTest from '../abstractTest.js';
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
}
const myCPT = new CPT([
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 },
    { qc: 10000 }, //5m
], 1);
console.log(myCPT);
