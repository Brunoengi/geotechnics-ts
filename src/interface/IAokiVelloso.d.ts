import type SPT from 'geotechnical/geotechnicalTests/SPT/SPT.ts'
import type CPT from 'geotechnical/geotechnicalTests/CPT/CPT.ts'

export type geotechnicalTest = CPT | SPT

export interface ISoilLayerWithSPTWithoutQuota {
  NSPT: number
  typeSoil: ISoilLayerWithoutQuota['typeSoil']
}

export interface ISoilLayerWithoutQuota {
  typeSoil: 'S' | 'SM' | 'SMC' | 'SC' | 'SCM' | 'M' | 'MS' | 'MSC' | 'MC' | 'MCS' | 'C' | 'CS' | 'CSM' | 'CM' | 'CMS'
}

export interface ISoilLayer extends ISoilLayerWithSPTWithoutQuota {
  quota: number
}

interface ISoilParamsVelloso {
  kav: number
  alfaav: number
}

interface ITypeParamsSoil {
  originals: ISoilParamsVelloso
  Danziger_Velloso_Laprovitera: ISoilParamsVelloso
  Monteiro: ISoilParamsVelloso
}

export type IParamsSoilJSON = Record<string, ITypeParamsSoil>

export interface ISoilParams {
  SPT: SPT
  config: {
    author: optionAuthorSoilParams
  }
}

export type IParamsStakeJSON = Record<string, IAuthorStakeParamsVelloso>

interface StakeParamsVelloso {
  F1: number
  F2: number
}

interface IAuthorStakeParamsVelloso {
  originals: StakeParamsVelloso
  Laprovitera_Benegas: StakeParamsVelloso
  Monteiro: StakeParamsVelloso
}

export interface IParamsStake {
  numberType: IValidNumbersStake['numbers']
  numberAuthor: originals | Laprovitera_Benegas | Monteiro
}

export interface IValidNumbersStake {
  numbers: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

export interface ISPTWithoutQuota {
  soilLayers: ISoilLayerWithSPTWithoutQuota[]
  config: {
    inicialQuota: number
    waterLevel: number
  }
}

export interface ISPT extends ISPTWithoutQuota {
  soilLayers: ISoilLayer[]
}

interface ILayerCPTWithoutQuota {
  qc: number
  typeSoil: ISoilLayerWithSPTWithoutQuota['typeSoil']
}

interface ILayerCPT {
  qc: ILayerCPTWithoutQuota['qc']
  quota: number
  typeSoil: ISoilLayerWithSPTWithoutQuota['typeSoil']
}

export interface ICPT {
  layers: ILayerCPTWithoutQuota[]
  inicialQuota: number
}

export interface ISoilResistenceAll {
  allBaseResistence: number[]
  allSideResistence: number[]
  allSumSideResistence: number[]
  baseResistence: number
  sumSideResistence: number
}

export interface IBaseLayerProps {
  quota: ISoilLayer['quota']
  typeSoil: ISoilLayer['typeSoil']
  kav: ISoilParamsVelloso['kav']
  alfaav: ISoilParamsVelloso['alfaav']
}

export interface ILayerPropsWithSPT extends IBaseLayerProps {
  NSPT: ISoilLayer['NSPT']
}

export interface ILayerPropsWithCPT extends IBaseLayerProps {
  qc: ILayerCPT['qc']
}
