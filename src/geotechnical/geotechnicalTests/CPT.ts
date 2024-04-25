import { type ICPT } from 'interface/IAokiVelloso.js'
import abstractTest from './abstractTest.js'

export default class CPT extends abstractTest<ICPT['layers']>{
  constructor (private readonly _soilLayers: ICPT['layers'], private readonly _inicialQuota: ICPT['inicialQuota']) {
    super()
  }

  protected addHeightForEachLayer (layers: ICPT['layers'], inicialQuota: ICPT['inicialQuota']): void {
    const deltayCPT = 0.2
    layers.forEach((layer, index) => {
      layer.quota = inicialQuota + (deltayCPT * index)
    })
  }

  get soilLayers () {
    return this._soilLayers
  }

  get inicialQuota () {
    return this._inicialQuota
  }
}
