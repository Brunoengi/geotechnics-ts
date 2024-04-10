import { ICPT, ISoilLayer } from "interface/IAokiVelloso.js";


export default class CPT {

  _soilLayers: ICPT
  _config: {
    inicialQuota: number
    waterLevel: number
  }

  constructor( { layers, inicialQuota } : ICPT) {

  }
  
  addHeightForEachLayer(layers: ICPT['layers'], inicialQuota: ICPT['inicialQuota']) {
    const deltayCPT = 0.2
    layers.forEach((layer, index) => {
      layer.quota = inicialQuota + (deltayCPT * index)
    })
  }
}