import type { IndicatorResult, MarketData } from '@core/types/indicator-types'
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
    if (indicators.length === 0) {
      throw new Error('At least one indicator is required')
    }

    const maxLength = MathUtils.max(indicators.map(ind => ind.values.length))
    const combinedValues: number[] = []

    for (let i = 0; i < maxLength; i++) {
      const validValues = indicators
        .map(ind => ind.values[i])
        .filter((val): val is number => val !== undefined && !isNaN(val))

      if (validValues.length === 0) {
        combinedValues.push(NaN)
      } else {
        combinedValues.push(MathUtils.average(validValues))
      }
    }

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
    const signals: number[] = []

    for (let i = 0; i < maxLength; i++) {
      const fast = fastIndicator.values[i]
      const slow = slowIndicator.values[i]

      if (fast === undefined || slow === undefined || isNaN(fast) || isNaN(slow)) {
        signals.push(NaN)
        continue
      }

      if (i === 0) {
        signals.push(0)
        continue
      }

      const prevFast = fastIndicator.values[i - 1]
      const prevSlow = slowIndicator.values[i - 1]

      if (prevFast === undefined || prevSlow === undefined || isNaN(prevFast) || isNaN(prevSlow)) {
        signals.push(0)
        continue
      }

      // Bullish crossover: fast crosses above slow
      if (prevFast <= prevSlow && fast > slow) {
        signals.push(1)
      }
      // Bearish crossover: fast crosses below slow
      else if (prevFast >= prevSlow && fast < slow) {
        signals.push(-1)
      }
      else {
        signals.push(0)
      }
    }

    return signals
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
    const signals: number[] = []

    for (let i = length; i < maxLength; i++) {
      const priceSlice = priceData.close.slice(i - length + 1, i + 1)
      const indicatorSlice = indicatorData.values.slice(i - length + 1, i + 1)

      const priceHigh = MathUtils.max(priceSlice)
      const priceLow = MathUtils.min(priceSlice)
      const indicatorHigh = MathUtils.max(indicatorSlice)
      const indicatorLow = MathUtils.min(indicatorSlice)

      const currentPrice = priceData.close[i]!
      const currentIndicator = indicatorData.values[i]!

      // Bullish divergence: price makes lower low, indicator makes higher low
      if (currentPrice === priceLow && currentIndicator > indicatorLow) {
        signals.push(1)
      }
      // Bearish divergence: price makes higher high, indicator makes lower high
      else if (currentPrice === priceHigh && currentIndicator < indicatorHigh) {
        signals.push(-1)
      }
      else {
        signals.push(0)
      }
    }

    return signals
  }
}
