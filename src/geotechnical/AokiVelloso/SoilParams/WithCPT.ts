import { type ILayerPropsWithCPT, type ISoilParams } from 'interface/IAokiVelloso.js'
import { type optionAuthorSoilParams } from '../../../enums/AokiVelloso.js'
import AbstractSoilParams from './AbstractSoilResistence.js'
import type CPT from '../../geotechnicalTests/CPT/CPT.js'

export class SoilParamsWithCPT extends AbstractSoilParams {
  _layersProps: ILayerPropsWithCPT[]

  private constructor (CPT: CPT, config: ISoilParams['config']) {
    super()
    const author: optionAuthorSoilParams = config.author
    this._layersProps = []
    this._config = {
      selectedAuthorSoilParams: author
    }
    // CPT.soilLayers.forEach((element, index) => {

    // })
  }

  setKav_alfaavLayer (CPT: CPT, index: number, author: optionAuthorSoilParams): { kav: number, alfaav: number } {
    const { alfaav, kav } = this.getKav_alfaavLayer(CPT.soilLayers[index].typeSoil, author)
    return {
      kav, alfaav
    }
  }
}
