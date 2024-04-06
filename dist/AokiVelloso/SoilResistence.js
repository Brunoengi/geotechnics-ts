import { SoilParams } from "./SoilParams.js";
import { StakeParams } from "./StakeParams.js";
import SPT from "../geotechnicalTests/SPT.js";
import { CircularStake } from "../stake/CircularStake.js";
export class SoilResistence {
    constructor(stakeSection, soilParams, stakeParams) {
        this._stake = stakeSection;
        this._soilParams = soilParams;
        this._stakeParams = stakeParams;
        this._resistence = {
            allBaseResistence: [],
            allSideResistence: [],
            allSumSideResistence: [],
            baseResistence: 0,
            sumSideResistence: 0
        };
        this.sumResistence();
    }
    sumResistence() {
        const referenceLayer = Math.floor(this._stake._inicialQuota + this._stake._height);
        const params = Object.assign({ inicialStakeQuota: this._stake._inicialQuota, heightStake: this._stake._height, depthStake: this._stake._inicialQuota + this._stake._height, referenceLayer: referenceLayer, baseArea: this._stake._area, perimeter: this._stake._perimeter, F1: this._stakeParams._myParamStake.F1, F2: this._stakeParams._myParamStake.F2 }, this._soilParams._LayersProps[referenceLayer]);
        console.log(params);
        const resistenceBase = this.calculateBaseResistence(params.kav, this.calculateNbar(params.depthStake), params.F1, params.baseArea);
        this.setBaseResistence(resistenceBase);
        let allSideResistence = [];
        this._soilParams._LayersProps.map((layer, index) => {
            const { NSPT, alfaav, kav, quota, typeSoil } = layer;
            allSideResistence.push(this.sideResistence(alfaav, kav, NSPT, params.F2, params.perimeter));
        });
        this._resistence.allSideResistence = allSideResistence;
    }
    calculateSumSideResistence() {
        const copy = this._resistence.allSideResistence.map(sideResistence => sideResistence);
        const copy2 = this._resistence.allSideResistence.map(sideResistence => sideResistence);
        this._resistence.allSumSideResistence = [];
        copy.forEach((oneSideResistence, index) => {
            let contador = 0;
            for (let i = 0; i <= index; i++) {
                contador += copy2[index];
                this._resistence.allSumSideResistence.push(contador);
            }
        });
    }
    calculateBaseResistence(kav, Nbar, F1, baseArea) {
        return kav * Nbar * baseArea / F1;
    }
    setBaseResistence(value) {
        this._resistence.baseResistence = value;
    }
    sideResistence(alfaav, kav, NSPT, F2, perimeter, deltaL = 1) {
        console.log({ alfaav, kav, NSPT, F2, perimeter, deltaL });
        const valor = (alfaav * kav * NSPT * perimeter * deltaL) / (100 * F2);
        return valor;
    }
    calculateNbar(depthStake) {
        const quotaToCalculateNbar = [Math.floor(depthStake) - 1, Math.floor(depthStake), Math.floor(depthStake) + 1];
        const layersToNBar = [];
        quotaToCalculateNbar.forEach((quota) => {
            const findQuote = this._soilParams._LayersProps.find((element) => element.quota == quota);
            layersToNBar.push(findQuote);
        });
        const SPTLayer = [layersToNBar[0].NSPT, layersToNBar[1].NSPT, layersToNBar[2].NSPT];
        return (SPTLayer[0] + SPTLayer[1] + SPTLayer[2]) / 3;
    }
    calculateSideResistence() {
        const inicialLayerQuota = this._soilParams._LayersProps[0]['quota'];
        const quoteStake = this._stake._height;
        let response = 0;
        for (let i = 0; quoteStake - inicialLayerQuota < i; i++) {
            response += this.calculateDeltaSideResistence(inicialLayerQuota + i);
        }
        return response;
    }
    calculateDeltaSideResistence(quoteLayer) {
        const { deltaL, perimeter, NSPTLayer } = {
            deltaL: 1,
            perimeter: this._stake._perimeter,
            NSPTLayer: this._soilParams._LayersProps[quoteLayer]['NSPT'],
        };
        const { F2 } = this._stakeParams._myParamStake;
        const { alfaav, kav } = this._soilParams._LayersProps[quoteLayer];
        return alfaav * kav * NSPTLayer * perimeter * deltaL / F2;
    }
}
const mySPT = new SPT([
    { NSPT: 12, typeSoil: 'SM' },
    { NSPT: 12, typeSoil: 'SM' },
    { NSPT: 15, typeSoil: 'SM' },
    { NSPT: 16, typeSoil: 'SM' },
    { NSPT: 15, typeSoil: 'SM' },
    { NSPT: 17, typeSoil: 'SM' },
    { NSPT: 19, typeSoil: 'SM' },
    { NSPT: 21, typeSoil: 'SM' },
    { NSPT: 23, typeSoil: 'SM' },
    { NSPT: 6, typeSoil: 'CM' },
    { NSPT: 6, typeSoil: 'CM' },
    { NSPT: 9, typeSoil: 'CM' },
    { NSPT: 10, typeSoil: 'CM' },
    { NSPT: 5, typeSoil: 'CM' },
    { NSPT: 6, typeSoil: 'CM' },
    { NSPT: 5, typeSoil: 'CM' },
    { NSPT: 5, typeSoil: 'CM' },
    { NSPT: 4, typeSoil: 'CM' }
], {
    inicialQuota: 1,
    waterLevel: 1,
});
const soilParams = await SoilParams.create(mySPT, {
    author: 2
});
const myStake = await StakeParams.create({
    numberAuthor: 3,
    numberType: 9
});
const stakeSection = new CircularStake({
    diameter: 0.3,
    height: 4,
    inicialQuota: 1
});
const mySoilResistence = new SoilResistence(stakeSection, soilParams, myStake);
console.log(mySoilResistence);
