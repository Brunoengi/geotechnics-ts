import { CircularStake } from './CircularStake.js'

describe('Test about Circular Stake', () => {
  test('checking that all properties of the class are not null or not undefined', () => {
    const stakeSection = new CircularStake({
      diameter: 0.3,
      height: 4,
      inicialQuota: 1
    })

    // get Properties
    const properties = Object.getOwnPropertyNames(stakeSection)

    // Iterator
    properties.forEach(property => {
      expect((stakeSection as any)[property]).not.toBeNull()
      expect((stakeSection as any)[property]).not.toBeUndefined()
    })
  })
})
