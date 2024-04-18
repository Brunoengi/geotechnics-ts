import SPT from "../geotechnicalTests/SPT.js";
import { JsonReader } from '../../utils/JsonReader.js';
import PathsProject from "../../utils/PathsProject.js";
import path from 'path';
var optionAuthorSoilParams;
(function (optionAuthorSoilParams) {
    optionAuthorSoilParams[optionAuthorSoilParams["originals"] = 1] = "originals";
    optionAuthorSoilParams[optionAuthorSoilParams["Danziger_Velloso_Laprovitera"] = 2] = "Danziger_Velloso_Laprovitera";
    optionAuthorSoilParams[optionAuthorSoilParams["Monteiro"] = 3] = "Monteiro";
})(optionAuthorSoilParams || (optionAuthorSoilParams = {}));
export class SoilParams {
    constructor(SPT, { author }) {
        this._LayersProps = [];
        this._config = {
            selectedAuthorSoilParams: author
        };
        SPT._soilLayers.forEach((element, index) => {
            const { kav, alfaav } = this.setKav_alfaavLayer(SPT, index, author);
            this._LayersProps.push({
                NSPT: SPT._soilLayers[index].NSPT,
                quota: SPT._soilLayers[index].quota,
                typeSoil: SPT._soilLayers[index].typeSoil,
                kav: kav,
                alfaav: alfaav
            });
        });
    }
    setKav_alfaavLayer(SPT, index, autor) {
        const { alfaav, kav } = this.getKav_alfaavLayer(SPT._soilLayers[index].typeSoil, autor);
        return {
            kav, alfaav
        };
    }
    getKav_alfaavLayer(typeSoil, selectedAuthorSoilParams) {
        const selectedOption = optionAuthorSoilParams[selectedAuthorSoilParams];
        return SoilParams._paramsSoil[typeSoil][selectedOption];
    }
    static async readFile() {
        this._paramsSoil = await JsonReader.readFileAsync(path.join(PathsProject.PathToJsonFolder(), 'AokiVelloso', 'soil.json'));
    }
    static async initialize() {
        await SoilParams.readFile();
    }
    static async create(SPTI, { author }) {
        await this.initialize();
        const mySPT = new SPT(SPTI.soilLayer, SPTI.config);
        const instance = new SoilParams(mySPT, { author });
        return instance;
    }
}
