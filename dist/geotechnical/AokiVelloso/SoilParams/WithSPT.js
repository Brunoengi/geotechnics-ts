import SPT from '../../geotechnicalTests/SPT/SPT.js';
import AbstractSoilResistence from '../SoilResistence/AbstractSoilResistence.js';
export class SoilParamsWithSPT extends AbstractSoilResistence {
    constructor(SPT, config) {
        super();
        const author = config.author;
        this._LayersProps = [];
        this._config = {
            selectedAuthorSoilParams: author
        };
        SPT.soilLayers.forEach((element, index) => {
            const { kav, alfaav } = this.setKav_alfaavLayer(SPT, index, author);
            this._LayersProps.push({
                NSPT: SPT.soilLayers[index].NSPT,
                quota: SPT.soilLayers[index].quota,
                typeSoil: SPT.soilLayers[index].typeSoil,
                kav,
                alfaav
            });
        });
    }
    setKav_alfaavLayer(SPT, index, autor) {
        const { alfaav, kav } = this.getKav_alfaavLayer(SPT.soilLayers[index].typeSoil, autor);
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
