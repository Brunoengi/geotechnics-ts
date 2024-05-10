import CPT from './CPT.js'

describe('Computacional tests about CPT (Cone Penetration Test)', () => {
  test('Check if all layers have the propertie Quota', () => {
    const myCPT = new CPT(
      [
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 1m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 1.2m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 1.4m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 1.6m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 1.8m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 2m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 2.2m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 2.4m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 2.6m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 2.8m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 3m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 3.2m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 3.4m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 3.6m
        {
          qc: 10000,
          typeSoil: 'S'
        }, // 3.8m
        {
          qc: 10000,
          typeSoil: 'S'
        } // 4m
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
