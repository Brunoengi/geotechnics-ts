import { type ISoilLayerWithoutQuota, type ISPT, type ISPTWithoutQuota } from 'interface/IAokiVelloso.js'
import abstractTest from '../abstractTest.js'

export default class SPT extends abstractTest<ISoilLayerWithoutQuota[]> {
  private _soilLayers: ISPT['soilLayers']

  constructor (_soilLayers: ISPTWithoutQuota['soilLayers'], private readonly _config: ISPTWithoutQuota['config']) {
    super()
    const { inicialQuota } = _config
    this._soilLayers = _soilLayers as ISPT['soilLayers']
    this.addHeightForEachLayer(_soilLayers, inicialQuota)
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
}
