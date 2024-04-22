import { type ISoilLayerWithoutQuota, type ISPT, type ISPTWithoutQuota } from 'interface/IAokiVelloso.js'

export default class SPT {
  _soilLayers: ISPT['soilLayers']

  constructor (_soilLayers: ISPTWithoutQuota['soilLayers'], private readonly _config: ISPTWithoutQuota['config']) {
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

  private addHeightForEachLayer (soilLayers: ISoilLayerWithoutQuota[], inicialQuota: number): void {
    soilLayers.forEach((oneLayer, index) => {
      this._soilLayers[index].quota = inicialQuota + index
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
