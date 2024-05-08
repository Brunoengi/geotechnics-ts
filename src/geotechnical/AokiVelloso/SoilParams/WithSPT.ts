import SPT from '../../geotechnicalTests/SPT/SPT.js'
import { type ILayerPropsWithSPT, type ISoilParams, type ISoilParamsVelloso } from 'interface/IAokiVelloso.js'
import { type optionAuthorSoilParams } from '../../../enums/AokiVelloso.js'
import AbstractSoilParams from './AbstractSoilResistence.js'

export class SoilParamsWithSPT extends AbstractSoilParams {
  _layersProps: ILayerPropsWithSPT[]

  private constructor (SPT: SPT, config: ISoilParams['config']) {
    super()
    const author: optionAuthorSoilParams = config.author
    this._layersProps = []
    this._config = {
      selectedAuthorSoilParams: author
    }
    SPT.soilLayers.forEach((element, index) => {
      const { kav, alfaav } = this.setKav_alfaavLayer(SPT, index, author)

      this._layersProps.push({
        NSPT: SPT.soilLayers[index].NSPT,
        quota: SPT.soilLayers[index].quota,
        typeSoil: SPT.soilLayers[index].typeSoil,
        kav,
        alfaav
      })
    })
  }

  setKav_alfaavLayer (SPT: SPT, index: number, author: optionAuthorSoilParams): ISoilParamsVelloso {
    const { alfaav, kav } = this.getKav_alfaavLayer(SPT.soilLayers[index].typeSoil, author)
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
