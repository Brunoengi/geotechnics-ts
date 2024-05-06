import { describe, expect, test } from '@jest/globals';
import { SoilResistence } from './SoilResistence.js';
import SPT from '../../geotechnicalTests/SPT/SPT.js';
import { SoilParams } from '../SoilParams/SoilParams.js';
import { StakeParams } from '../StakeParams/StakeParams.js';
import { CircularStake } from '../../stake/circular/CircularStake.js';
describe('Computacional tests about Soil Resistence based on Aoki Velloso method', () => {
    test('Verify if an instance not has any null property or undefined property', async () => {
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
        const soilParams = await SoilParams.create(mySPT, {
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
        const mySoilResistence = new SoilResistence(stakeSection, soilParams, myStake);
        // get Properties
        const properties = Object.getOwnPropertyNames(mySoilResistence);
        // Iterator
        properties.forEach(property => {
            expect(mySoilResistence[property]).not.toBeNull();
            expect(mySoilResistence[property]).not.toBeUndefined();
        });
    });
});
