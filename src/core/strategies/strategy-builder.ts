import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { MathUtils } from '@utils/math-utils'

/**
 * Strategy Builder
 *
 * Provides utilities for building and combining technical indicators into trading strategies.
 */
export class StrategyBuilder {
  /**
   * Combine multiple indicators into a single strategy
   *
   * @param indicators - Array of indicators to combine
   * @returns Combined indicator result
   */
  static combineIndicators(indicators: IndicatorResult[]): IndicatorResult {
    if (!indicators || indicators.length === 0) {
      throw new Error(ERROR_MESSAGES.INDICATORS_REQUIRED)
    }
    const maxLength = MathUtils.max(indicators.map(ind => ind.values.length))
    const combinedValues = ArrayUtils.processArray(Array.from({ length: maxLength }, (_, i) => i), (_, i) => {
      const validValues = indicators
        .map(ind => ind.values[i])
        .filter((val): val is number => val !== undefined && !isNaN(val))

      if (validValues.length === 0) {
        return NaN
      } else {
        return MathUtils.average(validValues)
      }
    })
    return {
      values: combinedValues,
      metadata: {
        length: maxLength,
        indicators: indicators.length,
        source: 'combined'
      }
    }
  }

  /**
   * Create a crossover strategy between two indicators
   *
   * @param fastIndicator - Fast indicator
   * @param slowIndicator - Slow indicator
   * @returns Crossover signal values
   */
  static createCrossover(fastIndicator: IndicatorResult, slowIndicator: IndicatorResult): number[] {
    const maxLength = MathUtils.max([fastIndicator.values.length, slowIndicator.values.length])
    return ArrayUtils.processArray(Array.from({ length: maxLength }, (_, i) => i), (_, i) => {
      const fast = fastIndicator.values[i]
      const slow = slowIndicator.values[i]
      if (fast === undefined || slow === undefined || isNaN(fast) || isNaN(slow)) {
        return NaN
      }
      if (i === 0) {
        return 0
      }
      const prevFast = fastIndicator.values[i - 1]
      const prevSlow = slowIndicator.values[i - 1]
      if (prevFast === undefined || prevSlow === undefined || isNaN(prevFast) || isNaN(prevSlow)) {
        return 0
      }
      if (prevFast <= prevSlow && fast > slow) {
        return 1
      }
      else if (prevFast >= prevSlow && fast < slow) {
        return -1
      }
      else {
        return 0
      }
    })
  }

  /**
   * Create a divergence strategy between price and indicator
   *
   * @param priceData - Price data
   * @param indicatorData - Indicator data
   * @param length - Lookback period
   * @returns Divergence signal values
   */
  static createDivergence(
    priceData: MarketData,
    indicatorData: IndicatorResult,
    length: number = 14
  ): number[] {
    const maxLength = MathUtils.max([priceData.close.length, indicatorData.values.length])
    return ArrayUtils.processArray(Array.from({ length: maxLength }, (_, i) => i), (_, i) => {
      if (i < length) {
        return 0
      }
      const priceSlice = priceData.close.slice(i - length + 1, i + 1)
      const indicatorSlice = indicatorData.values.slice(i - length + 1, i + 1)
      const priceHigh = MathUtils.max(priceSlice)
      const priceLow = MathUtils.min(priceSlice)
      const indicatorHigh = MathUtils.max(indicatorSlice)
      const indicatorLow = MathUtils.min(indicatorSlice)
      const currentPrice = priceData.close[i]!
      const currentIndicator = indicatorData.values[i]!
      if (currentPrice === priceLow && currentIndicator > indicatorLow) {
        return 1
      }
      else if (currentPrice === priceHigh && currentIndicator < indicatorHigh) {
        return -1
      }
      else {
        return 0
      }
    })
  }
}
