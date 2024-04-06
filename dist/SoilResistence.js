import { promises as fs } from 'fs';
import SPT from "./SPT.js";
var optionAuthorSoilParams;
(function (optionAuthorSoilParams) {
    optionAuthorSoilParams[optionAuthorSoilParams["originals"] = 1] = "originals";
    optionAuthorSoilParams[optionAuthorSoilParams["Danziger_Velloso_Laprovitera"] = 2] = "Danziger_Velloso_Laprovitera";
    optionAuthorSoilParams[optionAuthorSoilParams["Monteiro"] = 3] = "Monteiro";
})(optionAuthorSoilParams || (optionAuthorSoilParams = {}));
export default class SoilResistenceSPT {
    constructor(SPT, selectedAuthorSoilParams) {
        this._SPT = SPT;
        this.inicializeAokiVellosoFile();
        this._selectedAuthorSoilParams = selectedAuthorSoilParams;
    }
    async getKav_Alpaav() {
        const SPT = this._SPT;
        let all_Kav_alfaV = new Array();
        for (const soilLayer of SPT._soilLayers) {
            const kavalfaV = await this.getKav_alfaav(soilLayer.typeSoil, this._selectedAuthorSoilParams);
            all_Kav_alfaV.push(kavalfaV);
        }
        this._Kav_alfaav = all_Kav_alfaV;
        return this._Kav_alfaav;
    }
    static async readFileAokiVellosoSoil() {
        return JSON.parse(await fs.readFile('./src/AokiVelloso/soil.json', 'utf8'));
    }
    async inicializeAokiVellosoFile() {
        this._paramsSoil = await SoilResistenceSPT.readFileAokiVellosoSoil();
    }
    async getKav_alfaav(typeSoil, selectedAuthorSoilParams) {
        const selectedOption = optionAuthorSoilParams[selectedAuthorSoilParams];
        !this._paramsSoil ? await SoilResistenceSPT.readFileAokiVellosoSoil() : '';
        return this._paramsSoil[typeSoil][selectedOption];
    }
}
const reportSPT = new SPT([
    { NSPT: 12, typeSoil: 'SM' },
    { NSPT: 13, typeSoil: 'SM' },
    { NSPT: 14, typeSoil: 'SM' },
    { NSPT: 15, typeSoil: 'SM' },
    { NSPT: 17, typeSoil: 'S' },
    { NSPT: 19, typeSoil: 'S' }
], 1, 1);
//SPT, authorMethod -> originals... monteiro...
const soilResistence = new SoilResistenceSPT(reportSPT, 1);
//console.log(await soilResistence.getKav_Alpaav());
//console.log(await soilResistence.getKav_alfaav('SM', 1))
