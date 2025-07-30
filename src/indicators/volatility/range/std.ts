import { createVolatilityIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { calculateStandardDeviation } from '@core/utils/calculation-utils'
import { createIndicatorWrapper } from '@core/utils/indicator-utils'
import { sanitizeArray } from '@core/utils/validation-utils'

/**
 * Calculate Standard Deviation using centralized utilities
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @returns Standard deviation values array
 */
function calculateStd(data: number[], length: number): number[] {
  return ArrayUtils.processValidWindow(data, length, (window) => {
    const validValues = sanitizeArray(window)
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
export const StandardDeviationIndicator = createVolatilityIndicator(
  'StandardDeviationIndicator',
  'Standard Deviation',
  (data: MarketData | number[], length: number) => {
    const source = Array.isArray(data) ? data : data.close
    return calculateStd(source, length)
  },
  20
)

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
