export function findIndexMinimalDiferencePosition(myPosition, listPosition) {
    let minimalDifference = Infinity;
    let currentDifference;
    let indexMinimalDifference = 0;
    for (let i = 0; i < listPosition.length; i++) {
        currentDifference = Math.abs(listPosition[i] - myPosition);
        minimalDifference > currentDifference ? (indexMinimalDifference = i, minimalDifference = currentDifference) : '';
    }
    return indexMinimalDifference;
}
