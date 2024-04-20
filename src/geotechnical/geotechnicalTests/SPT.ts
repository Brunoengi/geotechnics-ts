import { type ISoilLayer, type ISPT } from 'interface/IAokiVelloso.js'

export default class SPT {
  constructor (private readonly _soilLayers: ISPT['soilLayers'], private readonly _config: ISPT['config']) {
    const { inicialQuota } = _config

    this.addHeightForEachLayer(_soilLayers, inicialQuota)
  }

  get soilLayers (): ISPT['soilLayers'] {
    return this._soilLayers
  }

  get config (): ISPT['config'] {
    return this._config
  }

  private addHeightForEachLayer (soilLayers: ISoilLayer[], inicialQuota: number): void {
    soilLayers.forEach((oneLayer, index) => {
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
