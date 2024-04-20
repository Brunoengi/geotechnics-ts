import SPT from "../geotechnicalTests/SPT.js";
import { ISoilLayer, IParamsSoilJSON, ISoilParams, ISPT } from 'interface/IAokiVelloso.js';
import { JsonReader } from '../../utils/JsonReader.js';
import path from 'path';
import PathToJsonFolder from "../../utils/PathsProject.js";


enum optionAuthorSoilParams {
  'originals' = 1,
  'Danziger_Velloso_Laprovitera' = 2,
  'Monteiro' = 3
}

export class SoilParams {

  _LayersProps: {
    NSPT: SPT['soilLayers'][0]['NSPT']
    quota: SPT['soilLayers'][0]['quota']
    typeSoil: SPT['soilLayers'][0]['typeSoil']
    kav: IParamsSoilJSON[0]['originals']['kav']
    alfaav: IParamsSoilJSON[0]['originals']['alfaav']
  }[]
  _config: {
    selectedAuthorSoilParams: optionAuthorSoilParams
  }
  static _paramsSoil: IParamsSoilJSON
  
  

  private constructor(SPT: SPT, {author}: ISoilParams['config']) {

    this._LayersProps = []
    this._config = {
      selectedAuthorSoilParams: author
    }
      SPT.soilLayers.forEach((element, index) => {
        const {kav, alfaav} = this.setKav_alfaavLayer(SPT, index, author)
        
        this._LayersProps.push({
          NSPT: SPT.soilLayers[index].NSPT,
          quota: SPT.soilLayers[index].quota,
          typeSoil: SPT.soilLayers[index].typeSoil,
          kav: kav,
          alfaav: alfaav        
        })
      })
    }
    
  setKav_alfaavLayer(SPT: SPT, index: number, autor: ISoilParams['config']['author']) {
    const {alfaav, kav} =  this.getKav_alfaavLayer(SPT.soilLayers[index].typeSoil, autor)
    return {
      kav, alfaav
    }
  }

  getKav_alfaavLayer(typeSoil: ISoilLayer['typeSoil'], selectedAuthorSoilParams: optionAuthorSoilParams) { 
    const selectedOption = optionAuthorSoilParams[selectedAuthorSoilParams]
    return SoilParams._paramsSoil[typeSoil as keyof IParamsSoilJSON][selectedOption as keyof typeof optionAuthorSoilParams]
  }

  static async readFile() {
    this._paramsSoil = await JsonReader.readFileAsync(path.join(PathToJsonFolder(), 'AokiVelloso', 'soil.json'))
  }

  static async initialize() {
    await SoilParams.readFile()
  }

  static async create(SPTI: SPT, {author}: ISoilParams['config']){
    await this.initialize()
    const mySPT = new SPT(SPTI.soilLayers, SPTI.config)
    const instance = new SoilParams(mySPT, 
      {author}
      )
    return instance
  }
}

