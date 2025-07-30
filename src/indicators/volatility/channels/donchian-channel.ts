import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * Donchian Channel indicator
 *
 * Calculates upper, middle, and lower bands based on highest high and lowest low.
 * Formula: Upper = Highest High, Lower = Lowest Low, Middle = (Upper + Lower) / 2
 *
 * @example
 * ```typescript
 * const dc = new DonchianChannel()
 * const result = dc.calculate(marketData, { length: 20 })
 * console.log(result.values) // Middle band
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export class DonchianChannel extends BaseIndicator {
  constructor() {
    super('DonchianChannel', 'Donchian Channel', 'volatility')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error('Donchian Channel requires OHLC market data')
    }
    const length = pineLength(config?.length || DEFAULT_LENGTHS.DONCHIAN, DEFAULT_LENGTHS.DONCHIAN)
    const { upper, middle, lower } = this.calculateDonchianChannel(data, length)
    return {
      values: middle,
      metadata: {
        length,
        source: 'hlc3',
        upper,
        lower
      }
    }
  }

  private calculateDonchianChannel(data: MarketData, length: number): {
    upper: number[]
    middle: number[]
    lower: number[]
  } {
    const upper = ArrayUtils.processWindow(data.high, length, (window) => {
      const validValues = window.filter(val => !isNaN(val))
      return validValues.length > 0 ? MathUtils.max(validValues) : NaN
    })
    const lower = ArrayUtils.processWindow(data.low, length, (window) => {
      const validValues = window.filter(val => !isNaN(val))
      return validValues.length > 0 ? MathUtils.min(validValues) : NaN
    })
    const middle = ArrayUtils.processArray(upper, (upperVal, i) => {
      const lowerVal = lower[i]
      if (isNaN(upperVal) || lowerVal === undefined || isNaN(lowerVal)) {
        return NaN
      }
      return (upperVal + lowerVal) / 2
    })
    return { upper, middle, lower }
  }
}

/**
 * Calculate Donchian Channel using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns Donchian Channel middle band values
 */
export function donchianChannel(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(DonchianChannel, data, length, source)
}
