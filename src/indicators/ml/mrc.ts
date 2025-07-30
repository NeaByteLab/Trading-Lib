import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { calculateMean, calculateStandardDeviation, calculateTrueRange } from '@core/utils/calculation-utils'
import { createIndicatorWrapper } from '@core/utils/indicator-utils'
import { pineLength } from '@core/utils/pine-script-utils'
import { sanitizeArray } from '@core/utils/validation-utils'

/**
 * Market Regime Classifier
 *
 * Uses machine learning techniques to classify market conditions into different regimes:
 * 0 = Ranging/Low Volatility, 1 = Trending, 2 = High Volatility, 3 = Reversal
 *
 * @example
 * ```typescript
 * const regime = new MarketRegimeClassifier()
 * const result = regime.calculate(marketData, { length: 20, threshold: 0.6 })
 * console.log(result.values) // Regime classification values
 * ```
 */
export class MarketRegimeClassifier extends BaseIndicator {
  constructor() {
    super('MarketRegimeClassifier', 'Market Regime Classifier', 'ml')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const length = pineLength(config?.length || 20, 20)
    const threshold = (config?.['threshold'] as number) || 0.6
    if (threshold < 0 || threshold > 1) {
      throw new Error('Threshold must be between 0 and 1')
    }
    const values = this.calculateRegimeClassification(data as MarketData, length, threshold)
    return {
      values,
      metadata: {
        length,
        threshold,
        source: config?.source || 'close'
      }
    }
  }

  private calculateRegimeClassification(data: MarketData, length: number, threshold: number): number[] {
    const returns = ArrayUtils.processArray(data.close, (close, i) => {
      if (i === 0) {return 0}
      const prevClose = data.close[i - 1]
      return prevClose !== undefined ? (close - prevClose) / prevClose : 0
    })
    const volatility = ArrayUtils.processWindow(returns, length, (window) => {
      const validReturns = sanitizeArray(window)
      if (validReturns.length === 0) {return 0}
      return calculateStandardDeviation(validReturns)
    })
    const trend = ArrayUtils.processWindow(data.close, length, (window) => {
      const validPrices = sanitizeArray(window)
      if (validPrices.length === 0) {return 0}
      const firstPrice = validPrices[0]!
      const lastPrice = validPrices[validPrices.length - 1]!
      return (lastPrice - firstPrice) / firstPrice
    })
    const atr = calculateTrueRange(data.high, data.low, data.close)
    const atrAvg = ArrayUtils.processWindow(atr, length, (window) => {
      const validATR = sanitizeArray(window)
      if (validATR.length === 0) {return 0}
      return calculateMean(validATR)
    })
    return ArrayUtils.processArray(data.close, (_, i) => {
      if (i < length - 1) {return 0}
      const vol = volatility[i] || 0
      const tr = trend[i] || 0
      const avgATR = atrAvg[i] || 0
      const currentATR = atr[i] || 0
      const volScore = vol > threshold ? 1 : 0
      const trendScore = Math.abs(tr) > threshold ? 1 : 0
      const atrScore = currentATR > avgATR * 1.5 ? 1 : 0
      if (volScore === 1 && atrScore === 1) {return 2}
      if (trendScore === 1 && volScore === 0) {return 1}
      if (atrScore === 1 && trendScore === 0) {return 3}
      return 0
    })
  }
}

/**
 * Calculate Market Regime Classification values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param threshold - Classification threshold (default: 0.6)
 * @returns Market regime classification values array
 */
export function marketRegimeClassifier(data: MarketData, length?: number, threshold?: number): number[] {
  return createIndicatorWrapper(MarketRegimeClassifier, data, length, undefined, { threshold })
}
