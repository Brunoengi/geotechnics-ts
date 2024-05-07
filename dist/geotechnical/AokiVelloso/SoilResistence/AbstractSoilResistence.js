import { JsonReader } from "../../../utils/JsonReader.js";
import path from "path";
import PathToJsonFolder from "../../../utils/PathsProject.js";
import { optionAuthorSoilParams } from "../../../enums/AokiVelloso.js";
export default class AbstractSoilResistence {
    static async readFile() {
        this._paramsSoil = await JsonReader.readFileAsync(path.join(PathToJsonFolder(), 'AokiVelloso', 'soil.json'));
    }
    static async initialize() {
        await AbstractSoilResistence.readFile();
    }
    getKav_alfaavLayer(typeSoil, selectedAuthorSoilParams) {
        const selectedOption = optionAuthorSoilParams[selectedAuthorSoilParams];
        return AbstractSoilResistence._paramsSoil[typeSoil][selectedOption];
    }
}
