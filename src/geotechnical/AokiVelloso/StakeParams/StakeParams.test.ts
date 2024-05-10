import { StakeParams } from './StakeParams.js'

describe('Computacional tests about Stake Params based on Aoki Velloso method', () => {
  test('Verify if all possibilities are defined and not null', async () => {
    const possibleNumberAuthor = 3
    const possibleNumberType = 9

    for (let i = 1; i <= possibleNumberAuthor; i++) {
      for (let j = 1; j <= possibleNumberType; j++) {
        const myStake = await StakeParams.create({
          numberAuthor: possibleNumberAuthor,
          numberType: possibleNumberType
        })

        // get all properties
        const properties = Object.keys(myStake)

        // Verify properties, to be defined and not null
        properties.forEach(property => {
          expect((myStake as any)[property]).toBeDefined()
          expect((myStake as any)[property]).not.toBeNull()
        })
      }
    }
  })
})
