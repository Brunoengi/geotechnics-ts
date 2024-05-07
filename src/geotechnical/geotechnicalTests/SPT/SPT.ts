import { ISoilLayer, type ISoilLayerWithoutQuota, type ISPT, type ISPTWithoutQuota } from 'interface/IAokiVelloso.js'
import abstractTest from '../abstractTest.js'
import { findIndexMinimalDiferencePosition } from '../../../utils/Find.js'

export default class SPT extends abstractTest<ISoilLayerWithoutQuota[]> {
  private _soilLayers: ISPT['soilLayers']
  private _maxNSPT = 50

  constructor (_soilLayers: ISPTWithoutQuota['soilLayers'], private readonly _config: ISPTWithoutQuota['config']) {
    super()
    const { inicialQuota } = _config
    this._soilLayers = _soilLayers as ISPT['soilLayers']
    this.addHeightForEachLayer(_soilLayers, inicialQuota)
    this.setMaxNSPT(this._soilLayers)
  }

  get soilLayers (): ISPT['soilLayers'] {
    return this._soilLayers
  }

  get config (): ISPTWithoutQuota['config'] {
    return this._config
  }

  protected addHeightForEachLayer (soilLayers: ISoilLayerWithoutQuota[], inicialQuota: number): void {
    soilLayers.forEach((oneLayer, index) => {
      this._soilLayers[index].quota = inicialQuota + index
    })
  }

  getSPTLayer (quote: number): number {
    return this.soilLayers[Math.floor(quote) - 1].NSPT
  }

  protected getQuotaLayers(): number[] {
    return this._soilLayers.map(layer => layer.quota)
  }

  protected getLayerByQuote(quote: number): ISoilLayer {
    const allQuotaLayers = this.getQuotaLayers()
    const index = findIndexMinimalDiferencePosition(quote, allQuotaLayers, (0.5 - 0.000001))
    return this._soilLayers[index]
  }

  setMaxNSPT(soilLayers: ISPT['soilLayers']): void {
    soilLayers.forEach(layer => {
      layer.NSPT >= this._maxNSPT ? layer.NSPT = this._maxNSPT : ''
    })
  }
}
