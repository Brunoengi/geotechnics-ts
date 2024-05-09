import { describe, expect, test } from '@jest/globals';
import CPT from './CPT.js';
describe('Computacional tests about CPT (Cone Penetration Test)', () => {
    test('Check if all layers have the propertie Quota', () => {
        const myCPT = new CPT([
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            },
            {
                qc: 10000,
                typeSoil: 'S'
            } // 4m
        ], 1);
        // get Layers
        const allLayers = myCPT.soilLayers;
        // Iterator
        allLayers.forEach(layer => {
            expect(typeof layer.quota).toBe('number');
        });
    });
});
