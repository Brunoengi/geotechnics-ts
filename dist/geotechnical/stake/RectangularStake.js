import { AbstractStake } from "./abstractStake.js";
export class RectangularStake extends AbstractStake {
    constructor({ inicialQuota, side, height }) {
        super({ inicialQuota, height });
        this._area = this.calculateBaseArea(side);
        this._perimeter = this.calculatePerimeter(side);
    }
    calculatePerimeter(side) {
        return 4 * side;
    }
    calculateBaseArea(side) {
        return side * side;
    }
}
