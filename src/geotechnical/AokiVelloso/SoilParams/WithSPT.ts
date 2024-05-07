import SPT from '../../geotechnicalTests/SPT/SPT.js'
import { type ILayerPropsWithSPT, type ISoilParams, type ISoilParamsVelloso } from 'interface/IAokiVelloso.js'
import { optionAuthorSoilParams } from '../../../enums/AokiVelloso.js'
import AbstractSoilParams from './AbstractSoilResistence.js'

export class SoilParamsWithSPT extends AbstractSoilParams {
  _LayersProps: ILayerPropsWithSPT[]

  private constructor (SPT: SPT, config: ISoilParams['config']) {
    super()
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


  static async create (SPTI: SPT, { author }: ISoilParams['config']): Promise<SoilParamsWithSPT> {
    await this.initialize()
    const mySPT = new SPT(SPTI.soilLayers, SPTI.config)
    const instance = new SoilParamsWithSPT(mySPT,
      { author }
    )
    return instance
  }
}
