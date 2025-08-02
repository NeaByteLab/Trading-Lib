import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { createIndicatorWrapper } from '@core/utils/indicator-utils'
import { MathUtils } from '@core/utils/math-utils'
import { pineSource } from '@core/utils/pine-script-utils'

/**
 * Least Squares Moving Average (LSMA) Indicator
 *
 * Calculates moving average using linear regression to minimize squared errors.
 * Formula: LSMA = a + b × t where a is intercept and b is slope
 * Provides trend direction and momentum information.
 *
 * @example
 * ```typescript
 * const lsma = leastSquaresMA(data, 20)
 * console.log(lsma) // LSMA values
 * ```
 */
export class LSMAIndicator extends BaseIndicator {
  constructor() {
    super('LSMA', 'Least Squares Moving Average', 'trend')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const length = config?.length || 20

    if (length <= 0) {
      throw new Error('Length must be positive')
    }

    const values = ArrayUtils.processWindow(source, length, (window) => {
      const validValues = window.filter(val => !isNaN(val) && isFinite(val))
      if (validValues.length < 2) {
        return NaN
      }

      return this.calculateLSMA(validValues)
    })

    return {
      values,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }

  private calculateLSMA(values: number[]): number {
    const n = values.length
    // Time indices [1, 2, 3, ...]
    const x = Array.from({ length: n }, (_, i) => i + 1)

    // Calculate means
    const xMean = MathUtils.average(x)
    const yMean = MathUtils.average(values)

    // Calculate slope (b)
    let numerator = 0
    let denominator = 0

    for (let i = 0; i < n; i++) {
      const xDiff = x[i]! - xMean
      const yDiff = values[i]! - yMean
      numerator += xDiff * yDiff
      denominator += xDiff * xDiff
    }

    if (denominator === 0) {
      // Return mean if no variance in x
      return yMean
    }

    const slope = numerator / denominator

    // Calculate intercept (a)
    const intercept = yMean - slope * xMean

    // Calculate LSMA value at the end of the period
    const lsma = intercept + slope * n

    return isFinite(lsma) ? lsma : NaN
  }
}

/**
 * Calculate Least Squares Moving Average using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns LSMA values array
 */
export function leastSquaresMA(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(LSMAIndicator, data, length, source)
}

export const lsma = leastSquaresMA
