export default class SPT {
    constructor(soilLayers, inicialHeight, waterLevel) {
        this.addHeightForEachLayer(soilLayers, inicialHeight);
        this._waterLevel = waterLevel;
        this._soilLayers = soilLayers;
        this._inicialHeight = inicialHeight;
    }
    addHeightForEachLayer(soilLayers, inicialHeight) {
        const soilLayersLenght = soilLayers.length;
        soilLayers.forEach((oneLayer, index) => {
            oneLayer['height'] = inicialHeight + index;
        });
    }
}
