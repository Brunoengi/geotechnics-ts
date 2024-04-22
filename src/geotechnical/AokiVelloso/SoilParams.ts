import SPT from '../geotechnicalTests/SPT.js'
import { type ISoilLayerWithoutQuota, type IParamsSoilJSON, type ISoilParams, type ISoilParamsVelloso, type ISoilLayer } from 'interface/IAokiVelloso.js'
import { JsonReader } from '../../utils/JsonReader.js'
import path from 'path'
import PathToJsonFolder from '../../utils/PathsProject.js'

enum optionAuthorSoilParams {
  'originals' = 1,
  'Danziger_Velloso_Laprovitera' = 2,
  'Monteiro' = 3
}

export class SoilParams {
  _LayersProps: Array<{
    NSPT: ISoilLayer['NSPT']
    quota: ISoilLayer['quota']
    typeSoil: ISoilLayer['typeSoil']
    kav: ISoilParamsVelloso['kav']
    alfaav: ISoilParamsVelloso['alfaav']
  }>

  _config: {
    selectedAuthorSoilParams: optionAuthorSoilParams
  }

  static _paramsSoil: IParamsSoilJSON

  private constructor (SPT: SPT, config: ISoilParams['config']) {
    const author: optionAuthorSoilParams = config.author
    this._LayersProps = []
    this._config = {
      selectedAuthorSoilParams: author
    }
    SPT.soilLayers.forEach((element, index) => {
      const { kav, alfaav } = this.setKav_alfaavLayer(SPT, index, author)

      this._LayersProps.push({
        NSPT: SPT.soilLayers[index].NSPT,
        quota: SPT.soilLayers[index].quota,
        typeSoil: SPT.soilLayers[index].typeSoil,
        kav,
        alfaav
      })
    })
  }

  setKav_alfaavLayer (SPT: SPT, index: number, autor: optionAuthorSoilParams): ISoilParamsVelloso {
    const { alfaav, kav } = this.getKav_alfaavLayer(SPT.soilLayers[index].typeSoil, autor)
    return {
      kav, alfaav
    }
  }

  getKav_alfaavLayer (typeSoil: ISoilLayerWithoutQuota['typeSoil'], selectedAuthorSoilParams: optionAuthorSoilParams): ISoilParamsVelloso {
    const selectedOption = optionAuthorSoilParams[selectedAuthorSoilParams]
    return SoilParams._paramsSoil[typeSoil as keyof IParamsSoilJSON][selectedOption as keyof typeof optionAuthorSoilParams]
  }

  static async readFile (): Promise<void> {
    this._paramsSoil = await JsonReader.readFileAsync(path.join(PathToJsonFolder(), 'AokiVelloso', 'soil.json'))
  }

  static async initialize (): Promise<void> {
    await SoilParams.readFile()
  }

  static async create (SPTI: SPT, { author }: ISoilParams['config']): Promise<SoilParams> {
    await this.initialize()
    const mySPT = new SPT(SPTI.soilLayers, SPTI.config)
    const instance = new SoilParams(mySPT,
      { author }
    )
    return instance
  }
}
