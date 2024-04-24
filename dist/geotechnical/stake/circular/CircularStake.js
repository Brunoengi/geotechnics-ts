import { AbstractStake } from '../abstractStake.js';
export class CircularStake extends AbstractStake {
    constructor({ inicialQuota, diameter, height }, isHollow = false) {
        super({ height, inicialQuota });
        this._diameter = diameter;
        this._area = this.calculateBaseArea(diameter);
        this._perimeter = this.calculatePerimeter(diameter);
        this._isHollow = isHollow;
    }
    calculatePerimeter(diameter) {
        return 2 * Math.PI * (diameter / 2);
    }
    calculateBaseArea(diameter) {
        return Math.PI * ((diameter / 2) ** 2);
    }
}
