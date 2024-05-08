import { type ILayerCPT, type ICPT } from 'interface/IAokiVelloso.js'
import abstractTest from '../abstractTest.js'
import { findIndexMinimalDiferencePosition } from '../../../utils/Find.js'

export default class CPT extends abstractTest<ICPT['layers']> {
  private readonly _soilLayers: ILayerCPT[]
  private readonly _inicialQuota: number

  constructor (soilLayers: ICPT['layers'], _inicialQuota: ICPT['inicialQuota']) {
    super()
    this._soilLayers = soilLayers.map(layer => {
      return { ...layer, quota: 0 }
    })
    this.addHeightForEachLayer(soilLayers, _inicialQuota)
  }

  protected addHeightForEachLayer (layers: ICPT['layers'], inicialQuota: ICPT['inicialQuota']): void {
    const deltayCPT = 0.2
    layers.forEach((layer, index) => {
      this._soilLayers[index].quota = inicialQuota + (deltayCPT * index)
    })
  }

  get soilLayers (): ILayerCPT[] {
    return this._soilLayers
  }

  get inicialQuota (): number {
    return this._inicialQuota
  }

  getQcLayerByQuote (quote: number): number {
    const index = this.getIndexByQuote(quote)
    return this._soilLayers[index].qc
  }

  getLayerByQuote (quote: number): ILayerCPT {
    const index = this.getIndexByQuote(quote)
    return this._soilLayers[index]
  }

  getIndexByQuote (quote: number): number {
    const allQuotaLayers = this.getQuotaLayers()
    return findIndexMinimalDiferencePosition(quote, allQuotaLayers, (0.1 - 0.000001))
  }

  protected getQuotaLayers (): number[] {
    return this._soilLayers.map(layer => layer.quota)
  }
}
