import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { calculateTrueRange, calculateWindowSum } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * Calculate Choppiness Index
 *
 * Choppiness Index measures the trendiness of a market.
 * Formula: 100 * log10(sum(TR) / (highest high - lowest low)) / log10(length)
 * Values range from 0 to 100, with values above 61.8 indicating choppy/sideways market
 * and values below 38.2 indicating trending market.
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Calculation period
 * @returns Choppiness Index values array
 */
function calculateChoppinessIndex(data: MarketData, length: number): number[] {
  const tr = calculateTrueRange(data.high, data.low, data.close)
  return ArrayUtils.processWindow(tr, length, (window, i) => {
    if (i < length - 1) {
      return NaN
    }
    const sumTR = calculateWindowSum(window)
    const highestHigh = MathUtils.max(data.high.slice(i - length + 1, i + 1))
    const lowestLow = MathUtils.min(data.low.slice(i - length + 1, i + 1))
    const range = highestHigh - lowestLow
    if (range === 0 || sumTR === 0) {return 0}
    const result = 100 * MathUtils.log10(sumTR / range) / MathUtils.log10(length)
    return isFinite(result) ? result : 0
  })
}

/**
 * Choppiness Index Indicator
 *
 * Measures the trendiness of a market by comparing the sum of true ranges
 * to the total range over a period. High values indicate choppy/sideways markets,
 * low values indicate trending markets.
 *
 * @example
 * ```typescript
 * const choppiness = new ChoppinessIndex()
 * const result = choppiness.calculate(marketData, { length: 14 })
 * console.log(result.values) // Choppiness Index values
 * ```
 */
export class ChoppinessIndex extends BaseIndicator {
  constructor() {
    super('ChoppinessIndex', 'Choppiness Index', 'volatility')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = pineLength(config?.length || 14, 14)
    const values = calculateChoppinessIndex(data, length)
    return {
      values,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Choppiness Index using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Calculation period (default: 14)
 * @returns Choppiness Index values array
 */
export function choppiness(data: MarketData, length: number = 14): number[] {
  return createIndicatorWrapper(ChoppinessIndex, data, length)
}
