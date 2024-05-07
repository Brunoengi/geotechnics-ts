export function findIndexMinimalDiferencePosition(myPosition: number, listPosition: number[], correctionlistValue: number = 0): number {
  let minimalDifference: number = Infinity
  let currentDifference: number
  let indexMinimalDifference: number = 0

  for(let i = 0; i < listPosition.length; i++) {
    currentDifference = Math.abs(listPosition[i] + correctionlistValue - myPosition)
    minimalDifference > currentDifference ? (indexMinimalDifference = i, minimalDifference = currentDifference) : ''
  }
  return indexMinimalDifference
}