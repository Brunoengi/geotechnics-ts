export default class CPT {
    constructor({ layers, inicialQuota }) {
    }
    addHeightForEachLayer(layers, inicialQuota) {
        const deltayCPT = 0.2;
        layers.forEach((layer, index) => {
            layer.quota = inicialQuota + (deltayCPT * index);
        });
    }
}
