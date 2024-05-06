export function findIndexMinimalDiferencePosition(myPosition: number, listPosition: number[]): number {
  let minimalDifference: number = Infinity
  let currentDifference: number
  let indexMinimalDifference: number = 0

  for(let i = 0; i < listPosition.length; i++) {
    currentDifference = Math.abs(listPosition[i] - myPosition)
    minimalDifference > currentDifference ? (indexMinimalDifference = i, minimalDifference = currentDifference) : ''
  }
  return indexMinimalDifference
}