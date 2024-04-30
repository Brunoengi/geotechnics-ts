/**
 const myStake = await StakeParams.create({
  numberAuthor: 3,
  numberType: 9
})
 */
import { describe, expect, test } from '@jest/globals';
import { StakeParams } from './StakeParams.js';
describe('Computacional tests about Stake Params based on Aoki Velloso method', () => {
    test('Verify if all possibilities are defined and not null', async () => {
        const possibleNumberAuthor = 3;
        const possibleNumberType = 9;
        for (let i = 1; i <= possibleNumberAuthor; i++) {
            for (let j = 1; j <= possibleNumberType; j++) {
                const myStake = await StakeParams.create({
                    numberAuthor: possibleNumberAuthor,
                    numberType: possibleNumberType
                });
                // get all properties
                const propriedades = Object.keys(myStake);
                // Verify properties, to be defined and not null
                propriedades.forEach(propriedade => {
                    expect(myStake[propriedade]).toBeDefined();
                    expect(myStake[propriedade]).not.toBeNull();
                });
            }
        }
    });
});
