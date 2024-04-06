export interface IAbstractStake {
  inicialQuota: number
  height: number
}

export interface ICircularStake extends IAbstractStake {
  diameter: number
}

export interface IRectangularStake extends IAbstractStake {
  side: number
}

