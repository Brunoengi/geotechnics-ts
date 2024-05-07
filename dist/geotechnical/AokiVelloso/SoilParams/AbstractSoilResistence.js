import { JsonReader } from "../../../utils/JsonReader.js";
import path from "path";
import PathToJsonFolder from "../../../utils/PathsProject.js";
import { optionAuthorSoilParams } from "../../../enums/AokiVelloso.js";
export default class AbstractSoilParams {
    static async readFile() {
        this._paramsSoil = await JsonReader.readFileAsync(path.join(PathToJsonFolder(), 'AokiVelloso', 'soil.json'));
    }
    static async initialize() {
        await AbstractSoilParams.readFile();
    }
    getKav_alfaavLayer(typeSoil, selectedAuthorSoilParams) {
        const selectedOption = optionAuthorSoilParams[selectedAuthorSoilParams];
        return AbstractSoilParams._paramsSoil[typeSoil][selectedOption];
    }
}
