import { describe, expect, test } from '@jest/globals'
import { findIndexMinimalDiferencePosition } from './Find.js'

describe('Computacional tests about Math functions)', () => {
  test('Check situation without correction value (third parameter of findIndex)', () => {
    const myList1 = [1, 2, 3, 4, 5, 6, 7, 8]
    const myList2 = [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3]
    const myList3 = [8, 7, 6, 5, 4, 3, 2, 1]

    const myPoint = 2.35

    expect(findIndexMinimalDiferencePosition(myPoint, myList1)).toBe(1)
    expect(findIndexMinimalDiferencePosition(myPoint, myList2)).toBe(7)
    expect(findIndexMinimalDiferencePosition(myPoint, myList3)).toBe(6)
  })
  test('Check situation with correction value (third parameter of findIndex)', () => {
    const myList1 = [1, 2, 3, 4, 5, 6, 7, 8]
    const myList2 = [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3]

    const myPoint1 = 1.4
    const myPoint2 = 1.3
    const myPoint3 = 1.39
    const myPoint4 = 1.29

    const correction = 0.09999

    expect(findIndexMinimalDiferencePosition(myPoint1, myList1, correction)).toBe(0)
    expect(findIndexMinimalDiferencePosition(myPoint2, myList2, correction)).toBe(1)
    expect(findIndexMinimalDiferencePosition(myPoint3, myList2, correction)).toBe(1)
    expect(findIndexMinimalDiferencePosition(myPoint4, myList2, correction)).toBe(1)
  })
})
