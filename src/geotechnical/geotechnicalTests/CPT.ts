import { ICPT, ISoilLayer } from "interface/IAokiVelloso.js";


export default class CPT {

  constructor( private _layers: ICPT['inicialQuota'], private _inicialQuota: ICPT['inicialQuota'] ) {}
  
  addHeightForEachLayer(layers: ICPT['layers'], inicialQuota: ICPT['inicialQuota']) {
    const deltayCPT = 0.2
    layers.forEach((layer, index) => {
      layer.quota = inicialQuota + (deltayCPT * index)
    })
  }
}