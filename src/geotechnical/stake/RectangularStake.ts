import { AbstractStake } from './abstractStake.js'
import { type IRectangularStake } from 'interface/IStake.js'

export class RectangularStake extends AbstractStake {
  _isHollow: boolean
  _side: number
  _area: number
  _height: number
  _perimeter: number

  constructor ({ inicialQuota, side, height }: IRectangularStake) {
    super({ inicialQuota, height })
    this._area = this.calculateBaseArea(side)
    this._perimeter = this.calculatePerimeter(side)
  }

  calculatePerimeter (side: number): number {
    return 4 * side
  }

  calculateBaseArea (side: number): number {
    return side * side
  }
}
