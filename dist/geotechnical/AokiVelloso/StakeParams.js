import { JsonReader } from "../../utils/JsonReader.js";
import PathsProject from "../../utils/PathsProject.js";
import path from "path";
var ItypeStake;
(function (ItypeStake) {
    ItypeStake[ItypeStake["Frank de fuste apiloado"] = 1] = "Frank de fuste apiloado";
    ItypeStake[ItypeStake["Frank de fuste vibrado"] = 2] = "Frank de fuste vibrado";
    ItypeStake[ItypeStake["Met\u00E1lica"] = 3] = "Met\u00E1lica";
    ItypeStake[ItypeStake["Pr\u00E9-moldada de concreto cravada a percuss\u00E3o"] = 4] = "Pr\u00E9-moldada de concreto cravada a percuss\u00E3o";
    ItypeStake[ItypeStake["Pr\u00E9-moldada de concreto cravada por prenagem"] = 5] = "Pr\u00E9-moldada de concreto cravada por prenagem";
    ItypeStake[ItypeStake["Escavada"] = 6] = "Escavada";
    ItypeStake[ItypeStake["Strauss"] = 7] = "Strauss";
    ItypeStake[ItypeStake["Raiz"] = 8] = "Raiz";
    ItypeStake[ItypeStake["H\u00E9lice cont\u00EDnua"] = 9] = "H\u00E9lice cont\u00EDnua";
})(ItypeStake || (ItypeStake = {}));
var AuthorStakeType;
(function (AuthorStakeType) {
    AuthorStakeType[AuthorStakeType["originals"] = 1] = "originals";
    AuthorStakeType[AuthorStakeType["Laprovitera_Benegas"] = 2] = "Laprovitera_Benegas";
    AuthorStakeType[AuthorStakeType["Monteiro"] = 3] = "Monteiro";
})(AuthorStakeType || (AuthorStakeType = {}));
export class StakeParams {
    constructor({ numberType, numberAuthor }) {
        this._author = numberAuthor;
        this._selectedNumberStake = numberType;
        this._nameStake = this.getItypeStakeFromNumber(numberType);
    }
    getItypeStakeFromNumber(num) {
        const keys = Object.keys(ItypeStake).filter(k => typeof ItypeStake[k] === 'number');
        const value = keys.find(k => ItypeStake[k] === num);
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
        !this._paramsAllStakes ? this._paramsAllStakes = await JsonReader.readFileAsync(path.join(PathsProject.PathToJsonFolder(), 'AokiVelloso', 'stake.json')) : '';
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
