import { type IAbstractStake } from 'interface/IStake.js'

export abstract class AbstractStake {
  _height: number
  _inicialQuota: number
  abstract _area: number
  abstract _perimeter: number
  abstract _isHollow: boolean

  constructor ({ inicialQuota, height }: IAbstractStake) {
    this._inicialQuota = inicialQuota
    this._height = height
  }

  get finalCote (): number {
    return this._inicialQuota + this._height
  }

  abstract calculateBaseArea (infoArea: number): number
  abstract calculatePerimeter (infoPerimeter: number): number
}
