import { describe, expect, test } from '@jest/globals'
import { CircularStake } from './CircularStake.js'

describe('Test about Circular Stake', () => {
  test('checking that all properties of the class are not null or not undefined', () => {
    const stakeSection = new CircularStake({
      diameter: 0.3,
      height: 4,
      inicialQuota: 1
    })

    // Verificar se todas as propriedades no objeto retornado não são null ou undefined

    expect(stakeSection._height).not.toBeNull()
    expect(stakeSection._height).not.toBeUndefined()

    expect(stakeSection._area).not.toBeNull()
    expect(stakeSection._area).not.toBeUndefined()

    expect(stakeSection._perimeter).not.toBeNull()
    expect(stakeSection._perimeter).not.toBeUndefined()
  })
})
