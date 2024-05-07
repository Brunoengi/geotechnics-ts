import { describe, expect, test } from '@jest/globals'
import CPT from './CPT.js'

describe('Computacional tests about CPT (Cone Penetration Test)', () => {
  test('Check if all layers have the propertie Quota', () => {
    const myCPT = new CPT(
      [
        { qc: 10000 }, // 1m
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 }, // 2m
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 }, // 3m
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 }, // 4m
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 },
        { qc: 10000 } // 5m
      ],
      1
    )

    // get Layers
    const allLayers = myCPT.soilLayers

    // Iterator
    allLayers.forEach(layer => {
      expect(typeof layer.quota).toBe('number')
    })
  })
})
