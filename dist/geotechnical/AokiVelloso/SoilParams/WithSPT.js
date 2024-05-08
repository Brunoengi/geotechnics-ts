import SPT from '../../geotechnicalTests/SPT/SPT.js';
import AbstractSoilParams from './AbstractSoilResistence.js';
export class SoilParamsWithSPT extends AbstractSoilParams {
    constructor(SPT, config) {
        super();
        const author = config.author;
        this._layersProps = [];
        this._config = {
            selectedAuthorSoilParams: author
        };
        SPT.soilLayers.forEach((element, index) => {
            const { kav, alfaav } = this.setKav_alfaavLayer(SPT, index, author);
            this._layersProps.push({
                NSPT: SPT.soilLayers[index].NSPT,
                quota: SPT.soilLayers[index].quota,
                typeSoil: SPT.soilLayers[index].typeSoil,
                kav,
                alfaav
            });
        });
    }
    setKav_alfaavLayer(SPT, index, author) {
        const { alfaav, kav } = this.getKav_alfaavLayer(SPT.soilLayers[index].typeSoil, author);
        return {
            kav, alfaav
        };
    }
    static async create(SPTI, { author }) {
        await this.initialize();
        const mySPT = new SPT(SPTI.soilLayers, SPTI.config);
        const instance = new SoilParamsWithSPT(mySPT, { author });
        return instance;
    }
}
