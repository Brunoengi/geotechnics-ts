import { AbstractStake } from './abstractStake.js'
import { type ICircularStake } from 'interface/IStake.js'

export class CircularStake extends AbstractStake {
  _isHollow: boolean
  _perimeter: number
  _area: number
  _height: number
  _diameter: number

  constructor ({ inicialQuota, diameter, height }: ICircularStake) {
    super({ height, inicialQuota })
    this._diameter = diameter
    this._area = this.calculateBaseArea(diameter)
    this._perimeter = this.calculatePerimeter(diameter)
  }

  calculatePerimeter (diameter: number): number {
    return 2 * Math.PI * (diameter / 2)
  }

  calculateBaseArea (diameter: number): number {
    return Math.PI * ((diameter / 2) ** 2)
  }
}
