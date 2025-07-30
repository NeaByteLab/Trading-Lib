import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { calculateAccumulationDistribution } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Calculate Chaikin Oscillator
 *
 * Chaikin Oscillator combines price and volume to measure momentum.
 * Formula: Chaikin Oscillator = 3-day EMA of AD - 10-day EMA of AD
 *
 * @param data - Market data with OHLCV
 * @param fastLength - Fast EMA period (default: 3)
 * @param slowLength - Slow EMA period (default: 10)
 * @returns Chaikin Oscillator values array
 */
function calculateChaikinOscillator(data: MarketData, fastLength: number = 3, slowLength: number = 10): number[] {
  const ad = calculateAccumulationDistribution(data.high, data.low, data.close, data.volume!)
  const fastEMA = movingAverage(ad, fastLength, 'ema')
  const slowEMA = movingAverage(ad, slowLength, 'ema')
  return ArrayUtils.processArray(fastEMA, (fast, i) => {
    const slow = slowEMA[i]
    if (fast === undefined || slow === undefined || isNaN(fast) || isNaN(slow)) {return NaN}
    const result = fast - slow
    return isFinite(result) ? result : NaN
  })
}

/**
 * Chaikin Oscillator Indicator
 *
 * Combines price and volume to measure momentum by calculating the difference
 * between fast and slow EMAs of the Accumulation Distribution Line.
 * Positive values indicate buying pressure, negative values indicate selling pressure.
 *
 * @example
 * ```typescript
 * const chaikin = new ChaikinOscillator()
 * const result = chaikin.calculate(marketData, { fastLength: 3, slowLength: 10 })
 * console.log(result.values) // Chaikin Oscillator values
 * ```
 */
export class ChaikinOscillator extends BaseIndicator {
  constructor() {
    super('ChaikinOscillator', 'Chaikin Oscillator', 'momentum')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    if (!data.volume) {
      throw new Error(ERROR_MESSAGES.VOLUME_REQUIRED)
    }
    const fastLength = (config?.['fastLength'] as number) || 3
    const slowLength = (config?.['slowLength'] as number) || 10
    if (fastLength >= slowLength) {
      throw new Error(ERROR_MESSAGES.FAST_LENGTH_GREATER)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const fastLength = (config?.['fastLength'] as number) || 3
    const slowLength = (config?.['slowLength'] as number) || 10
    const values = calculateChaikinOscillator(data as MarketData, fastLength, slowLength)
    return {
      values,
      metadata: {
        length: fastLength,
        fastLength,
        slowLength,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Chaikin Oscillator using wrapper function
 *
 * @param data - Market data with OHLCV
 * @param fastLength - Fast EMA period (default: 3)
 * @param slowLength - Slow EMA period (default: 10)
 * @returns Chaikin Oscillator values array
 */
export function chaikinOscillator(data: MarketData, fastLength: number = 3, slowLength: number = 10): number[] {
  return createIndicatorWrapper(ChaikinOscillator, data, undefined, undefined, { fastLength, slowLength })
}
