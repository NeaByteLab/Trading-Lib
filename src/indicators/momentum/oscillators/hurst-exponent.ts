import { OscillatorIndicator } from '@core/base/oscillator-indicator'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { calculateLogReturns } from '@core/utils/calculations/momentum'
import { createIndicatorWrapper } from '@core/utils/indicator-utils'
import { MathUtils } from '@core/utils/math-utils'

/**
 * Hurst Exponent Indicator
 *
 * Calculates the Hurst exponent to determine if a time series is trending, mean-reverting, or random.
 * Formula: H = log(R/S) / log(n) where R is the range and S is the standard deviation
 * - H > 0.5: Trending (persistent)
 * - H = 0.5: Random walk
 * - H < 0.5: Mean-reverting (anti-persistent)
 *
 * @example
 * ```typescript
 * const hurst = hurstExponent(data, 20)
 * console.log(hurst) // Hurst exponent values
 * ```
 */
export class HurstExponentIndicator extends OscillatorIndicator {
  constructor() {
    super('HurstExponent', 'Hurst Exponent', 20, 1)
  }

  protected calculateOscillator(data: number[], length: number): number[] {
    const logReturns = calculateLogReturns(data)
    return ArrayUtils.processWindow(logReturns, length, (window) => {
      const validReturns = window.filter(val => !isNaN(val) && isFinite(val))
      if (validReturns.length < 10) {
        return NaN
      }

      return this.calculateHurstExponent(validReturns)
    })
  }

  private calculateHurstExponent(returns: number[]): number {
    const n = returns.length
    const cumulativeReturns = this.calculateCumulativeReturns(returns)

    // Calculate R (range)
    const max = MathUtils.max(cumulativeReturns)
    const min = MathUtils.min(cumulativeReturns)
    const range = max - min

    // Calculate S (standard deviation)
    const mean = MathUtils.average(returns)
    const variance = returns.reduce((sum, ret) => {
      return sum + Math.pow(ret - mean, 2)
    }, 0) / returns.length
    const stdDev = Math.sqrt(variance)

    if (stdDev === 0) {
      return NaN
    }

    // Calculate R/S ratio
    const rsRatio = range / stdDev

    if (rsRatio <= 0) {
      return NaN
    }

    // Calculate Hurst exponent
    const hurst = Math.log(rsRatio) / Math.log(n)

    return isFinite(hurst) ? hurst : NaN
  }

  private calculateCumulativeReturns(returns: number[]): number[] {
    const cumulative: number[] = []
    let sum = 0

    for (const ret of returns) {
      sum += ret
      cumulative.push(sum)
    }

    return cumulative
  }
}

/**
 * Calculate Hurst Exponent using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns Hurst exponent values array
 */
export function hurstExponent(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(HurstExponentIndicator, data, length, source)
}
