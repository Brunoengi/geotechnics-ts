import SPT from "../geotechnicalTests/SPT.js";
import { ISoilLayer, IParamsSoilJSON, ISoilParams, ISPT } from 'interface/IAokiVelloso.js';
import { JsonReader } from '../utils/JsonReader.js';

enum optionAuthorSoilParams {
  'originals' = 1,
  'Danziger_Velloso_Laprovitera' = 2,
  'Monteiro' = 3
}

export class SoilParams {

  _LayersProps: {
    NSPT: SPT['_soilLayers'][0]['NSPT']
    quota: SPT['_soilLayers'][0]['quota']
    typeSoil: SPT['_soilLayers'][0]['typeSoil']
    kav: IParamsSoilJSON[0]['originals']['kav']
    alfaav: IParamsSoilJSON[0]['originals']['alfaav']
  }[]
  _config: {
    selectedAuthorSoilParams: optionAuthorSoilParams
  }
  static _paramsSoil: IParamsSoilJSON
  
  

  constructor(SPT: SPT, {author}: ISoilParams['config']) {

    this._LayersProps = []
    this._config = {
      selectedAuthorSoilParams: author
    }
      SPT._soilLayers.forEach((element, index) => {

        const typeSoil = SPT._soilLayers[index].typeSoil
        let kavLayer, alfaavLayer

        const {kav, alfaav} = this.setKav_alfaavLayer(SPT, index, author)
        
        this._LayersProps.push({
          NSPT: SPT._soilLayers[index].NSPT,
          quota: SPT._soilLayers[index].quota,
          typeSoil: SPT._soilLayers[index].typeSoil,
          kav: kav,
          alfaav: alfaav        
        })
      })
    }
    
  setKav_alfaavLayer(SPT: SPT, index: number, autor: ISoilParams['config']['author']) {
    const {alfaav, kav} =  this.getKav_alfaavLayer(SPT._soilLayers[index].typeSoil, autor)
    return {
      kav, alfaav
    }
  }

  getKav_alfaavLayer(typeSoil: ISoilLayer['typeSoil'], selectedAuthorSoilParams: optionAuthorSoilParams) { 
    const selectedOption = optionAuthorSoilParams[selectedAuthorSoilParams]
    return SoilParams._paramsSoil[typeSoil as keyof IParamsSoilJSON][selectedOption as keyof typeof optionAuthorSoilParams]
  }

  static async readFile() {
    this._paramsSoil = await JsonReader.readFileAsync('./src/json/AokiVelloso/soil.json')
  }

  static async initialize() {
    await SoilParams.readFile()
  }

  static async create(SPTI: SPT, {author}: ISoilParams['config']){
    await this.initialize()
    const mySPT = new SPT(SPTI.soilLayer, SPTI.config)
    const instance = new SoilParams(mySPT, 
      {author}
      )
    return instance
  }
}


const mySPT = new SPT([
  {NSPT: 12, typeSoil: 'SM'},
  {NSPT: 13, typeSoil: 'SM'},
  {NSPT: 14, typeSoil: 'SM'},
  {NSPT: 15, typeSoil: 'SM'},
  {NSPT: 17, typeSoil: 'S'},
  {NSPT: 19, typeSoil: 'S'}
], {
  inicialQuota: 1,
  waterLevel: 1,
  })

const soilParams = await SoilParams.create(mySPT, {
  author: 1
})
