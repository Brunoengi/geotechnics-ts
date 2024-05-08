import AbstractSoilParams from "./AbstractSoilResistence.js";
export class SoilParamsWithCPT extends AbstractSoilParams {
    constructor(CPT, config) {
        super();
        const author = config.author;
        this._layersProps = [];
        this._config = {
            selectedAuthorSoilParams: author
        };
        // CPT.soilLayers.forEach((element, index) => {
        // })
    }
    setKav_alfaavLayer(CPT, index, author) {
        const { alfaav, kav } = this.getKav_alfaavLayer(CPT.soilLayers[index].typeSoil, author);
        return {
            kav, alfaav
        };
    }
}
