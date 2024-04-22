import { type StakeParamsVelloso, type IParamsStake, type IParamsStakeJSON, type IValidNumbersStake } from 'interface/IAokiVelloso.js'
import { JsonReader } from '../../utils/JsonReader.js'
import path from 'path'
import PathToJsonFolder from '../../utils/PathsProject.js'
import { optionTypeStake, AuthorStakeType } from '../../enums/AokiVelloso.js'

export class StakeParams {
  static _paramsAllStakes: IParamsStakeJSON
  _nameStake: optionTypeStake | undefined
  _myParamStake: StakeParamsVelloso
  _author: AuthorStakeType
  _selectedNumberStake: IValidNumbersStake['numbers']

  private constructor ({ numberType, numberAuthor }: IParamsStake) {
    this._author = numberAuthor
    this._selectedNumberStake = numberType
    this._nameStake = this.getItypeStakeFromNumber(numberType)
  }

  getItypeStakeFromNumber (num: number): optionTypeStake | undefined {
    const keys: string[] = Object.keys(optionTypeStake).filter(k => typeof optionTypeStake[k as keyof typeof optionTypeStake] === 'number')
    const value: string | undefined = keys.find(k => optionTypeStake[k as keyof typeof optionTypeStake] === num)
    return value as optionTypeStake | undefined
  }

  async getParamsF1F2 (): Promise<StakeParamsVelloso> {
    const numberAuthor = this._author
    const selectedNumberStake = this._selectedNumberStake
    const authorMethod = AuthorStakeType[numberAuthor]
    this._myParamStake = StakeParams._paramsAllStakes[selectedNumberStake][authorMethod as keyof typeof AuthorStakeType]

    return this._myParamStake
  }

  static async readFile (): Promise<void> {
    this._paramsAllStakes = await JsonReader.readFileAsync(path.join(PathToJsonFolder(), 'AokiVelloso', 'stake.json'))
  }

  static async initialize (): Promise<void> {
    await StakeParams.readFile()
  }

  static async create ({ numberType, numberAuthor }: IParamsStake): Promise<StakeParams> {
    await StakeParams.initialize()
    const instance = new StakeParams({ numberType, numberAuthor })
    await instance.getParamsF1F2()
    return instance
  }
}
