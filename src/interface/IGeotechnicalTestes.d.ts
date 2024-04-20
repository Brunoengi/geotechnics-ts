export interface ITests<T> {
  addHeightForEachLayer: (layer: T, quota: number) => void
}
