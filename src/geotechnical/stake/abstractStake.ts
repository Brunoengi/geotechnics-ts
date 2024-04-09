import { IAbstractStake } from "interface/IStake.js"

export abstract class AbstractStake {

  _isHollow: boolean
  _height: number
  _inicialQuota: number
  abstract _area: number
  abstract _perimeter: number

  constructor({inicialQuota, height}: IAbstractStake) {
    this._inicialQuota = inicialQuota
    this._height = height
  }

  get finalCote() {
    return this._inicialQuota + this._height
  }
  
  abstract calculateBaseArea(infoArea: number): number
  abstract calculatePerimeter(infoPerimeter: number): number
}

