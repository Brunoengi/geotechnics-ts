import { type AbstractStake } from '../stake/abstractStake.js'
import { type SoilParams } from './SoilParams.js'
import { type StakeParams } from './StakeParams.js'

export class SoilResistence {
  _stake: AbstractStake
  _soilParams: SoilParams
  _stakeParams: StakeParams

  _resistence: {
    allBaseResistence: number[]
    allSideResistence: number[]
    allSumSideResistence: number[]
    baseResistence: number
    sumSideResistence: number
  }

  constructor (stakeSection: AbstractStake, soilParams: SoilParams, stakeParams: StakeParams) {
    this._stake = stakeSection
    this._soilParams = soilParams
    this._stakeParams = stakeParams

    this._resistence = {
      allBaseResistence: [],
      allSideResistence: [],
      allSumSideResistence: [],
      baseResistence: 0,
      sumSideResistence: 0
    }

    this.sumResistence()
  }

  sumResistence () {
    const referenceLayer = Math.floor(this._stake._inicialQuota + this._stake._height)
    const params = {
      inicialStakeQuota: this._stake._inicialQuota,
      heightStake: this._stake._height,
      depthStake: this._stake._inicialQuota + this._stake._height,
      referenceLayer,
      baseArea: this._stake._area,
      perimeter: this._stake._perimeter,
      F1: this._stakeParams._myParamStake.F1!,
      F2: this._stakeParams._myParamStake.F2!,
      ...this._soilParams._LayersProps[referenceLayer]
    }

    const resistenceBase = this.calculateBaseResistence(params.kav, this.calculateNbar(params.depthStake), params.F1, params.baseArea)
    this.setBaseResistence(resistenceBase)

    const allSideResistence: number[] = []
    this._soilParams._LayersProps.map((layer, index) => {
      const { NSPT, alfaav, kav, quota, typeSoil } = layer
      allSideResistence.push(this.sideResistence(alfaav, kav, NSPT, params.F2, params.perimeter))
    })
    this._resistence.allSideResistence = allSideResistence
  }

  calculateSumSideResistence () {
    const copy = this._resistence.allSideResistence.map(sideResistence => sideResistence)
    const copy2 = this._resistence.allSideResistence.map(sideResistence => sideResistence)

    this._resistence.allSumSideResistence = []

    copy.forEach((oneSideResistence, index) => {
      let contador = 0
      for (let i = 0; i <= index; i++) {
        contador += copy2[index]
        this._resistence.allSumSideResistence.push(contador)
      }
    })
  }

  calculateBaseResistence (kav: number, Nbar: number, F1: number, baseArea: number) {
    return kav * Nbar * baseArea / F1
  }

  setBaseResistence (value: number) {
    this._resistence.baseResistence = value
  }

  sideResistence (alfaav: number, kav: number, NSPT: number, F2: number, perimeter: number, deltaL: number = 1) {
    console.log({ alfaav, kav, NSPT, F2, perimeter, deltaL })
    const valor = (alfaav * kav * NSPT * perimeter * deltaL) / (100 * F2)

    return valor
  }

  calculateNbar (depthStake: number) {
    const quotaToCalculateNbar = [Math.floor(depthStake) - 1, Math.floor(depthStake), Math.floor(depthStake) + 1]
    const layersToNBar: typeof this._soilParams._LayersProps = []
    quotaToCalculateNbar.forEach((quota) => {
      const findQuote = this._soilParams._LayersProps.find((element) => element.quota == quota)
      layersToNBar.push(findQuote!)
    })
    const SPTLayer = [layersToNBar[0].NSPT, layersToNBar[1].NSPT, layersToNBar[2].NSPT]
    return (SPTLayer[0] + SPTLayer[1] + SPTLayer[2]) / 3
  }

  calculateSideResistence () {
    const inicialLayerQuota = this._soilParams._LayersProps[0].quota
    const quoteStake = this._stake._height
    let response = 0
    for (let i = 0; quoteStake - inicialLayerQuota! < i; i++) {
      response += this.calculateDeltaSideResistence(inicialLayerQuota! + i)
    }
    return response
  }

  calculateDeltaSideResistence (quoteLayer: number) {
    const { deltaL, perimeter, NSPTLayer } = {
      deltaL: 1,
      perimeter: this._stake._perimeter,
      NSPTLayer: this._soilParams._LayersProps[quoteLayer].NSPT
    }

    const { F2 } = this._stakeParams._myParamStake
    const { alfaav, kav } = this._soilParams._LayersProps[quoteLayer]

    return alfaav * kav * NSPTLayer * perimeter * deltaL / F2!
  }
}
