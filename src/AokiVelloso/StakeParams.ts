import { IParamsStake, IParamsStakeJSON, IValidNumbersStake } from "interface/IAokiVelloso.js"
import { JsonReader } from "../utils/JsonReader.js"

enum ItypeStake {
  'Frank de fuste apiloado' = 1,
  'Frank de fuste vibrado' = 2,
  'Metálica' = 3,
  'Pré-moldada de concreto cravada a percussão' = 4,
  'Pré-moldada de concreto cravada por prenagem' = 5,
  'Escavada' = 6,
  'Strauss' = 7,
  'Raiz' = 8,
  'Hélice contínua' = 9
}

enum AuthorStakeType {
  originals = 1,
  Laprovitera_Benegas = 2,
  Monteiro = 3
}

export class StakeParams {
  static _paramsAllStakes: IParamsStakeJSON
  _nameStake: ItypeStake | undefined
  _myParamStake: IParamsStakeJSON[1]['originals']
  _author: AuthorStakeType
  _selectedNumberStake: IValidNumbersStake['numbers']

  constructor({numberType, numberAuthor}: IParamsStake) {
      this._author = numberAuthor;
      this._selectedNumberStake = numberType;
      this._nameStake = this.getItypeStakeFromNumber(numberType);  
  }

  getItypeStakeFromNumber(num: number): ItypeStake | undefined {
    const keys: string[] = Object.keys(ItypeStake).filter(k => typeof ItypeStake[k as keyof typeof ItypeStake] === 'number');
    const value: string | undefined = keys.find(k => ItypeStake[k as keyof typeof ItypeStake] === num);
    return value as ItypeStake | undefined;
  }



  async getParamsF1F2() {
    const numberAuthor = this._author
    const selectedNumberStake = this._selectedNumberStake
    const authorMethod = AuthorStakeType[numberAuthor]
    this._myParamStake = StakeParams._paramsAllStakes[selectedNumberStake][authorMethod as keyof typeof AuthorStakeType]

    return this._myParamStake

  }

  static async readFile() {
    !this._paramsAllStakes ? this._paramsAllStakes = await JsonReader.readFileAsync('./src/json/AokiVelloso/stake.json') : ''
  }

  static async initialize() {
    await StakeParams.readFile()

  }
  static async create({numberType, numberAuthor}: IParamsStake){
    await StakeParams.initialize()
    const instance = new StakeParams({numberType, numberAuthor})
    await instance.getParamsF1F2()
    return instance
  }
}

