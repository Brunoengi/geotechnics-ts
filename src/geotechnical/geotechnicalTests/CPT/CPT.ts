import { ILayerCPT, type ICPT } from 'interface/IAokiVelloso.js'
import abstractTest from '../abstractTest.js'

export default class CPT extends abstractTest<ICPT['layers']>{
  private _soilLayers: ILayerCPT[]
  private _inicialQuota: number

  constructor (soilLayers: ICPT['layers'], _inicialQuota: ICPT['inicialQuota']) {
    super()
    this._soilLayers = soilLayers as ILayerCPT[]
    this.addHeightForEachLayer(soilLayers, _inicialQuota)
  }

  protected addHeightForEachLayer (layers: ICPT['layers'], inicialQuota: ICPT['inicialQuota']): void {
    const deltayCPT = 0.2
    layers.forEach((layer, index) => {
      this._soilLayers[index].quota = inicialQuota + (deltayCPT * index)
    })
  }

  get soilLayers () {
    return this._soilLayers
  }

  get inicialQuota () {
    return this._inicialQuota
  }

  // getCPTLayer(quote: number): number {
  //   this._soilLayers.find((layer) => {
  //     layer.quota
  //   })
  // }

}
