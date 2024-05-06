import { describe, expect, test } from '@jest/globals';
import { findIndexMinimalDiferencePosition } from './Math.js';
describe('Computacional tests about Math functions)', () => {
    test('Check if one situation is ok', () => {
        const myList1 = [1, 2, 3, 4, 5, 6, 7, 8];
        const myList2 = [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3];
        const myList3 = [8, 7, 6, 5, 4, 3, 2, 1];
        const myPoint = 2.35;
        expect(findIndexMinimalDiferencePosition(myPoint, myList1)).toBe(1);
        expect(findIndexMinimalDiferencePosition(myPoint, myList2)).toBe(7);
        expect(findIndexMinimalDiferencePosition(myPoint, myList3)).toBe(6);
    });
});
