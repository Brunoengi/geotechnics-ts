import { ISoilLayer, ISPT } from "interface/IAokiVelloso.js"

export default class SPT {

  _soilLayers: ISoilLayer[]
  _config: {
    inicialQuota: number
    waterLevel: number
  }
  
  constructor(_soilLayers: ISPT['soilLayers'], { inicialQuota, waterLevel }: ISPT['config']) {

    this.addHeightForEachLayer(_soilLayers, inicialQuota)
    
    this._soilLayers = _soilLayers
    this._config = {
      waterLevel: waterLevel,
      inicialQuota: inicialQuota
    } 
  }

  get soilLayer(){
    return this._soilLayers
  }

  get config(){
    return this._config
  }

  private addHeightForEachLayer(soilLayers: ISoilLayer[], inicialQuota: number) {
    soilLayers.forEach((oneLayer, index) => {
      oneLayer['quota'] = inicialQuota + index
    })
  }

  getSPTLayer(quote: number) {
    return this._soilLayers[Math.floor(quote) - 1].NSPT
  }
}

const reportSPT = new SPT([
  {NSPT: 12, typeSoil: 'SM'},
  {NSPT: 13, typeSoil: 'SM'},
  {NSPT: 14, typeSoil: 'SM'},
  {NSPT: 15, typeSoil: 'SM'},
  {NSPT: 17, typeSoil: 'S'},
  {NSPT: 19, typeSoil: 'S'}
],
{
  inicialQuota: 2,
  waterLevel: 1.5,
})


