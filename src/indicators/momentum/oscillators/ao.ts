import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { PriceCalculations } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'

/**
 * Unified Oscillator Factory
 *
 * Creates oscillators that calculate Fast SMA - Slow SMA using median price
 * Eliminates duplication between AO and Accelerator oscillators
 */
function createMedianPriceOscillator(
  name: string,
  description: string,
  defaultFastLength: number,
  defaultSlowLength: number
) {
  return class extends BaseIndicator {
    constructor() {
      super(name, description, 'momentum')
    }

    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
      this.validateInput(data, config)
      pineSource(data, config?.source)
      const fastLength = pineLength((config?.['fastLength'] as number) || defaultFastLength, defaultFastLength)
      const slowLength = pineLength((config?.['slowLength'] as number) || defaultSlowLength, defaultSlowLength)
      if (fastLength >= slowLength) {
        throw new Error(ERROR_MESSAGES.FAST_LENGTH_GREATER)
      }

      // Validate data before calculation
      if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLC)
      }

      const marketData = data as MarketData
      if (!marketData.high || !marketData.low || marketData.high.length === 0 || marketData.low.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA)
      }

      const medianPrice = PriceCalculations.hl2(marketData)
      const fastSMA = movingAverage(medianPrice, fastLength, 'sma')
      const slowSMA = movingAverage(medianPrice, slowLength, 'sma')

      // Ensure both arrays have the same length by aligning them
      const minLength = Math.min(fastSMA.length, slowSMA.length)
      const alignedFastSMA = fastSMA.slice(-minLength)
      const alignedSlowSMA = slowSMA.slice(-minLength)

      const values = ArrayUtils.processArray(alignedFastSMA, (fast, i) => {
        const slow = alignedSlowSMA[i]
        return fast !== undefined && slow !== undefined && !isNaN(fast) && !isNaN(slow) ? fast - slow : NaN
      })
      return {
        values,
        metadata: {
          length: fastLength,
          fastLength,
          slowLength,
          source: config?.source || 'hl2'
        }
      }
    }
  }
}

/**
 * Awesome Oscillator indicator
 *
 * AO = Fast SMA - Slow SMA using median price (high + low) / 2
 *
 * @example
 * ```typescript
 * const ao = new AwesomeOscillator()
 * const result = ao.calculate(marketData, { fastLength: 5, slowLength: 34 })
 * console.log(result.values) // AO values
 * ```
 */
export class AwesomeOscillator extends createMedianPriceOscillator('Awesome Oscillator', 'Awesome Oscillator', 5, 34) {}

/**
 * Accelerator Oscillator indicator
 *
 * AO = Fast SMA - Slow SMA using median price (high + low) / 2
 *
 * @example
 * ```typescript
 * const accel = new AcceleratorOscillator()
 * const result = accel.calculate(marketData, { fastLength: 5, slowLength: 34 })
 * console.log(result.values) // Accelerator values
 * ```
 */
export class AcceleratorOscillator extends createMedianPriceOscillator('Accelerator Oscillator', 'Accelerator Oscillator', 5, 34) {}

/**
 * Calculate Awesome Oscillator values
 *
 * @param data - Market data with high, low arrays
 * @param fastLength - Fast SMA period (default: 5)
 * @param slowLength - Slow SMA period (default: 34)
 * @returns Awesome Oscillator values array
 */
export function awesomeOscillator(data: MarketData, fastLength: number = 5, slowLength: number = 34): number[] {
  return createIndicatorWrapper(AwesomeOscillator, data, undefined, undefined, { fastLength, slowLength })
}

/**
 * Calculate Accelerator Oscillator values
 *
 * @param data - Market data with high, low arrays
 * @param fastLength - Fast SMA period (default: 5)
 * @param slowLength - Slow SMA period (default: 34)
 * @returns Accelerator Oscillator values array
 */
export function acceleratorOscillator(data: MarketData, fastLength: number = 5, slowLength: number = 34): number[] {
  return createIndicatorWrapper(AcceleratorOscillator, data, undefined, undefined, { fastLength, slowLength })
}
