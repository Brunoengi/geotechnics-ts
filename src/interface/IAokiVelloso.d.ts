export interface ISoilLayer {
  NSPT: number
  typeSoil: 'S' | 'SM' | 'SMC' | 'SC' | 'SCM' | 'M' | 'MS' | 'MSC' | 'MC' | 'MCS' | 'C' | 'CS' | 'CSM' | 'CM' | 'CMS' 
  quota?: undefined | number
}

export interface IParamsSoilJSON {
  [key: string]: {
    originals: {
      kav: number;
      alfaav: number;
    };
    Danziger_Velloso_Laprovitera: {
      kav: number;
      alfaav: number;
    };
    Monteiro: {
      kav: number;
      alfaav: number;
    };
  };
}

export interface ISoilParams {
  SPT: SPT
  config: {
    author: optionAuthorSoilParams
  }
}

export interface IParamsStakeJSON {
  [key: string]: {
    originals: {
      F1: number | null;
      F2: number | null;
    };
    Laprovitera_Benegas: {
      F1: number | null;
      F2: number | null;
    };
    Monteiro: {
      F1: number | null;
      F2: number | null;
    };
  };
}

export interface IParamsStake {
    numberType: IValidNumbersStake['numbers']
    numberAuthor: originals | Laprovitera_Benegas | Monteiro
}

export interface IValidNumbersStake {
  numbers: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

export interface ISPT {
  soilLayers: ISoilLayer[]
  config: {
    inicialQuota: number
    waterLevel: number
  }
}

export interface ICPT {
  layers: {
    qc: number,
    quota: number
  }[],
  inicialQuota: number
}

