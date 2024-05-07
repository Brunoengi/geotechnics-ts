export default abstract class abstractTest<T> {
  protected abstract addHeightForEachLayer (layer: T, quota: number): void
  protected abstract getQuotaLayers (): number[]
  protected abstract getLayerByQuote (quote: number): void
}
