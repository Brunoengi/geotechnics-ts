import { type ISPT, type ISPTWithoutQuota, type ISoilLayer } from 'interface/IAokiVelloso.js'

export default class SPT {
  _soilLayers: ISPT['soilLayers']

  constructor (_soilLayers: ISPTWithoutQuota['soilLayers'], private readonly _config: ISPTWithoutQuota['config']) {
    const { inicialQuota } = _config

    this._soilLayers = _soilLayers as ISPT['soilLayers']
    this.addHeightForEachLayer(_soilLayers as ISPT['soilLayers'], inicialQuota)
  }

  get soilLayers (): ISPT['soilLayers'] {
    return this._soilLayers
  }

  get config (): ISPTWithoutQuota['config'] {
    return this._config
  }

  private addHeightForEachLayer (soilLayers: ISoilLayer[], inicialQuota: number): void {
    this._soilLayers.forEach((oneLayer, index) => {
      oneLayer.quota = inicialQuota + index
    })
  }

  getSPTLayer (quote: number): number {
    return this.soilLayers[Math.floor(quote) - 1].NSPT
  }
}

// const reportSPT = new SPT([
//   { NSPT: 12, typeSoil: 'SM' },
//   { NSPT: 13, typeSoil: 'SM' },
//   { NSPT: 14, typeSoil: 'SM' },
//   { NSPT: 15, typeSoil: 'SM' },
//   { NSPT: 17, typeSoil: 'S' },
//   { NSPT: 19, typeSoil: 'S' }
// ],
// {
//   inicialQuota: 2,
//   waterLevel: 1.5
// })
