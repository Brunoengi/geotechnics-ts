import { JsonReader } from '../../../utils/JsonReader.js';
import path from 'path';
import PathToJsonFolder from '../../../utils/PathsProject.js';
import { optionTypeStake, AuthorStakeType } from '../../../enums/AokiVelloso.js';
export class StakeParams {
    constructor({ numberType, numberAuthor }) {
        this._author = numberAuthor;
        this._selectedNumberStake = numberType;
        this._nameStake = this.getItypeStakeFromNumber(numberType);
    }
    getItypeStakeFromNumber(num) {
        const keys = Object.keys(optionTypeStake).filter(k => typeof optionTypeStake[k] === 'number');
        const value = keys.find(k => optionTypeStake[k] === num);
        return value;
    }
    async getParamsF1F2() {
        const numberAuthor = this._author;
        const selectedNumberStake = this._selectedNumberStake;
        const authorMethod = AuthorStakeType[numberAuthor];
        this._myParamStake = StakeParams._paramsAllStakes[selectedNumberStake][authorMethod];
        return this._myParamStake;
    }
    static async readFile() {
        this._paramsAllStakes = await JsonReader.readFileAsync(path.join(PathToJsonFolder(), 'AokiVelloso', 'stake.json'));
    }
    static async initialize() {
        await StakeParams.readFile();
    }
    static async create({ numberType, numberAuthor }) {
        await StakeParams.initialize();
        const instance = new StakeParams({ numberType, numberAuthor });
        await instance.getParamsF1F2();
        return instance;
    }
}
