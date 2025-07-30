import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { calculateHighLowRange, calculateRangePercentage } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength } from '@utils/pine-script-utils'

const DEFAULT_LENGTHS = {
  K: 14,
  D: 3
}

/**
 * Stochastic Oscillator indicator
 *
 * A momentum oscillator that compares a closing price to its price range over time.
 * Formula: %K = ((Close - Lowest Low) / (Highest High - Lowest Low)) × 100
 *
 * @example
 * ```typescript
 * const stochastic = new Stochastic()
 * const result = stochastic.calculate(marketData, { length: 14 })
 * console.log(result.values) // %K and %D values
 * ```
 */
export class Stochastic extends BaseIndicator {
  constructor() {
    super('Stochastic', 'Stochastic Oscillator', 'momentum')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error('Stochastic requires OHLC market data')
    }
    const kLength = pineLength((config?.['kLength'] as number) || DEFAULT_LENGTHS.K, DEFAULT_LENGTHS.K)
    const dLength = pineLength((config?.['dLength'] as number) || DEFAULT_LENGTHS.D, DEFAULT_LENGTHS.D)
    const { k, d } = this.calculateStochastic(data, kLength, dLength)
    return {
      values: k,
      metadata: {
        length: kLength,
        kLength,
        dLength,
        source: config?.source || 'close',
        d
      }
    }
  }

  /**
   * Calculate Stochastic Oscillator using centralized utilities
   *
   * @param data - Market data
   * @param kLength - %K period
   * @param dLength - %D period
   * @returns %K and %D values
   */
  private calculateStochastic(data: MarketData, kLength: number, dLength: number): {
    k: number[]
    d: number[]
  } {
    const k = ArrayUtils.processWindow(data.close, kLength, (_, i) => {
      // Use centralized utilities instead of manual slicing and calculations
      const { highest, lowest } = calculateHighLowRange(data.high, data.low, i, kLength)
      const currentClose = data.close[i]!
      return calculateRangePercentage(currentClose, lowest, highest, 100)
    })
    const d = movingAverage(k, dLength, 'sma')
    return { k, d }
  }
}

/**
 * Calculate Stochastic Oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param kLength - %K period (default: 14)
 * @param dLength - %D period (default: 3)
 * @param source - Price source (default: 'close')
 * @returns %K and %D values
 */
export function stochastic(data: MarketData | number[], kLength?: number, dLength?: number, source?: string): number[] {
  return createIndicatorWrapper(Stochastic, data, kLength, source, { dLength })
}
