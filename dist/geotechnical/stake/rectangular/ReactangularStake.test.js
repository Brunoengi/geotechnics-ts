import { describe, expect, test } from '@jest/globals';
import { RectangularStake } from './RectangularStake.js';
describe('Test about Circular Stake', () => {
    test('checking that all properties of the class are not null or not undefined', () => {
        const stakeSection = new RectangularStake({
            side: 0.3,
            height: 5,
            inicialQuota: 1
        });
        // get Properties
        const properties = Object.getOwnPropertyNames(stakeSection);
        // Iterator
        properties.forEach(property => {
            expect(stakeSection[property]).not.toBeNull();
            expect(stakeSection[property]).not.toBeUndefined();
        });
    });
});
