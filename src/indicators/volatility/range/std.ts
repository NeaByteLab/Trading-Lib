import { VolatilityIndicator } from '@base/volatility-indicator'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { calculateStandardDeviation } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Calculate Standard Deviation using centralized utilities
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @returns Standard deviation values array
 */
function calculateStd(data: number[], length: number): number[] {
  return ArrayUtils.processValidWindow(data, length, (window) => {
    const validValues = window.filter(val => !isNaN(val))
    return validValues.length > 0 ? calculateStandardDeviation(validValues) : NaN
  })
}

/**
 * Standard Deviation Indicator
 *
 * Measures price volatility by calculating the standard deviation of price changes.
 * Higher values indicate greater volatility and price dispersion.
 * Formula: σ = √(Σ(x - μ)² / (n - 1))
 *
 * @example
 * ```typescript
 * const std = new StandardDeviationIndicator()
 * const result = std.calculate(marketData, { length: 20 })
 * console.log(result.values) // Standard deviation values
 * ```
 */
export class StandardDeviationIndicator extends VolatilityIndicator {
  constructor() {
    super('StandardDeviationIndicator', 'Standard Deviation', 20, 1.0, 1)
  }

  protected calculateVolatility(data: number[], length: number, _multiplier: number): number[] {
    return calculateStd(data, length)
  }
}

/**
 * Calculate Standard Deviation using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns Standard deviation values array
 */
export function std(
  data: MarketData | number[],
  length?: number,
  source?: string
): number[] {
  return createIndicatorWrapper(StandardDeviationIndicator, data, length, source)
}
