import { type ICPT } from 'interface/IAokiVelloso.js'

export default class CPT {
  constructor (private readonly _layers: ICPT['inicialQuota'], private readonly _inicialQuota: ICPT['inicialQuota']) {}

  addHeightForEachLayer (layers: ICPT['layers'], inicialQuota: ICPT['inicialQuota']): void {
    const deltayCPT = 0.2
    layers.forEach((layer, index) => {
      layer.quota = inicialQuota + (deltayCPT * index)
    })
  }
}
