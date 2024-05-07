import SPT from "../geotechnical/geotechnicalTests/SPT/SPT.js";
import { SoilParamsWithSPT } from "../geotechnical/AokiVelloso/SoilParams/WithSPT.js";
import { StakeParams } from "../geotechnical/AokiVelloso/StakeParams/StakeParams.js";
import { CircularStake } from "../geotechnical/stake/circular/CircularStake.js";
import { SoilResistenceWithSPT } from "../geotechnical/AokiVelloso/SoilResistence/WithSPT.js";
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
const soilParams = await SoilParamsWithSPT.create(mySPT, {
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
const mySoilResistence = new SoilResistenceWithSPT(stakeSection, soilParams, myStake);
console.log(mySoilResistence);
