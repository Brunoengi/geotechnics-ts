import { describe, expect, test } from '@jest/globals';
import SPT from './SPT.js';
describe('Computacional tests about SPT (Standart Penetration Test)', () => {
    test('Check properties if is not null or not undefined', () => {
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
        // get Properties
        const properties = Object.getOwnPropertyNames(mySPT);
        // Iterator
        properties.forEach(property => {
            expect(mySPT[property]).not.toBeNull();
            expect(mySPT[property]).not.toBeUndefined();
        });
    });
    test('Check if NSPT greater than 50 causes NSPT = 50', () => {
        const mySPTwithNSPTBetter50 = new SPT([
            { NSPT: 60, typeSoil: 'SM' },
            { NSPT: 50, typeSoil: 'SM' },
            { NSPT: 40, typeSoil: 'SM' },
            { NSPT: 40, typeSoil: 'SM' },
            { NSPT: 60, typeSoil: 'SM' }
        ], {
            inicialQuota: 1,
            waterLevel: 1
        });
        const mymySPTwithNSPT50 = new SPT([
            { NSPT: 50, typeSoil: 'SM' },
            { NSPT: 50, typeSoil: 'SM' },
            { NSPT: 40, typeSoil: 'SM' },
            { NSPT: 40, typeSoil: 'SM' },
            { NSPT: 50, typeSoil: 'SM' }
        ], {
            inicialQuota: 1,
            waterLevel: 1
        });
        expect(mySPTwithNSPTBetter50).toEqual(mymySPTwithNSPT50);
    });
});
