import { describe, expect, test } from '@jest/globals';
import { SoilParamsWithSPT } from './WithSPT.js';
import SPT from '../../geotechnicalTests/SPT/SPT.js';
describe('Computacional tests about Soil Params based on Aoki Velloso method', () => {
    test('Verify if all possibilities are defined and not null', async () => {
        const numberAuthors = 3;
        for (let i = 0; i <= numberAuthors; i++) {
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
                waterLevel: 1
            });
            const soilParams = await SoilParamsWithSPT.create(mySPT, {
                author: numberAuthors
            });
            // get all properties
            const properties = Object.keys(soilParams);
            // Verify properties, to be defined and not null
            properties.forEach(property => {
                expect(soilParams[property]).toBeDefined();
                expect(soilParams[property]).not.toBeNull();
            });
        }
    });
});
