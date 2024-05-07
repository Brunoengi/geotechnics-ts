import { IParamsSoilJSON, ISoilLayerWithoutQuota, ISoilParamsVelloso } from "interface/IAokiVelloso.js"
import { JsonReader } from "../../../utils/JsonReader.js"
import path from "path"
import PathToJsonFolder from "../../../utils/PathsProject.js"
import { optionAuthorSoilParams } from "../../../enums/AokiVelloso.js"

export default abstract class AbstractSoilParams {
 static _paramsSoil: IParamsSoilJSON
 _config: {
  selectedAuthorSoilParams: optionAuthorSoilParams
}

  static async readFile (): Promise<void> {
    this._paramsSoil = await JsonReader.readFileAsync(path.join(PathToJsonFolder(), 'AokiVelloso', 'soil.json'))
  }
  static async initialize (): Promise<void> {
    await AbstractSoilParams.readFile()
  }
  getKav_alfaavLayer (typeSoil: ISoilLayerWithoutQuota['typeSoil'], selectedAuthorSoilParams: optionAuthorSoilParams): ISoilParamsVelloso {
    const selectedOption = optionAuthorSoilParams[selectedAuthorSoilParams]
    return AbstractSoilParams._paramsSoil[typeSoil as keyof IParamsSoilJSON][selectedOption as keyof typeof optionAuthorSoilParams]
  }
}