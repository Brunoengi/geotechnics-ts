import { promises as fs } from 'fs';
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
    AuthorStakeType[AuthorStakeType["originals"] = 0] = "originals";
    AuthorStakeType[AuthorStakeType["Laprovitera_Benegas"] = 1] = "Laprovitera_Benegas";
    AuthorStakeType[AuthorStakeType["Monteiro"] = 2] = "Monteiro";
})(AuthorStakeType || (AuthorStakeType = {}));
export class Stake {
    constructor(number, author) {
        this.inicializeAokiVellosoFile();
        this._author = author;
        this._selectedNumberStake = number;
        this._nameStake = this.getItypeStakeFromNumber(number);
    }
    getItypeStakeFromNumber(num) {
        const keys = Object.keys(ItypeStake).filter(k => typeof ItypeStake[k] === 'number');
        const value = keys.find(k => ItypeStake[k] === num);
        return value;
    }
    static async readFileAokiVellosoStake() {
        return JSON.parse(await fs.readFile('./src/AokiVelloso/stake.json', 'utf8'));
    }
    async getParamsF1F2() {
        const numberAuthor = this._author;
        const selectedNumberStake = this._selectedNumberStake;
        const authorMethod = AuthorStakeType[numberAuthor];
        !this._paramsAllStakes ? await Stake.readFileAokiVellosoStake() : '';
        this._myParamStake = await this._paramsAllStakes[selectedNumberStake][authorMethod];
        return this._myParamStake;
    }
    async inicializeAokiVellosoFile() {
        this._paramsAllStakes = await Stake.readFileAokiVellosoStake();
    }
}
const myStake = new Stake(1, 2);
//console.log(await myStake.getParamsF1F2());
// await myStake.inicializeAokiVellosoFile()
// await myStake.getParamsF1F2(1 , 2)
// console.log(myStake._myParamStake)
