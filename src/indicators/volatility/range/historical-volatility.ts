import { VolatilityIndicator } from '@core/base/volatility-indicator'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { calculateLogReturns } from '@core/utils/calculations/momentum'
import { createIndicatorWrapper } from '@core/utils/indicator-utils'
import { MathUtils } from '@core/utils/math-utils'

/**
 * Historical Volatility Indicator
 *
 * Calculates historical volatility using log returns over a specified period.
 * Formula: HV = √(252) × √(Σ(ln(Pt/Pt-1)²) / (n-1))
 * Annualized volatility measure for risk assessment.
 *
 * @example
 * ```typescript
 * const hv = historicalVolatility(data, 20)
 * console.log(hv) // Annualized volatility values
 * ```
 */
export class HistoricalVolatilityIndicator extends VolatilityIndicator {
  constructor() {
    super('HistoricalVolatility', 'Historical Volatility', 20, 1.0, 1)
  }

  protected calculateVolatility(data: number[], length: number, _multiplier: number): number[] {
    const logReturns = calculateLogReturns(data)
    return ArrayUtils.processWindow(logReturns, length, (window) => {
      const validReturns = window.filter(val => !isNaN(val) && isFinite(val))
      if (validReturns.length < 2) {
        return NaN
      }

      // Calculate variance of log returns
      const mean = MathUtils.average(validReturns)
      const variance = validReturns.reduce((sum, ret) => {
        return sum + Math.pow(ret - mean, 2)
      }, 0) / (validReturns.length - 1)

      // Annualize volatility (√252 for daily data)
      const dailyVolatility = Math.sqrt(variance)
      const annualizedVolatility = dailyVolatility * Math.sqrt(252)

      return isFinite(annualizedVolatility) ? annualizedVolatility : NaN
    })
  }
}

/**
 * Calculate Historical Volatility using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns Historical volatility values array (annualized)
 */
export function historicalVolatility(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(HistoricalVolatilityIndicator, data, length, source)
}
