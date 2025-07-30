import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'

/**
 * Absolute Price Oscillator indicator
 *
 * APO = Fast EMA - Slow EMA
 *
 * @example
 * ```typescript
 * const apo = new APO()
 * const result = apo.calculate(marketData, { fastLength: 12, slowLength: 26 })
 * console.log(result.values) // APO values
 * ```
 */
export class APO extends BaseIndicator {
  constructor() {
    super('APO', 'Absolute Price Oscillator', 'momentum')
  }
  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const fastLength = pineLength((config?.['fastLength'] as number) || 12, 12)
    const slowLength = pineLength((config?.['slowLength'] as number) || 26, 26)
    if (fastLength >= slowLength) {
      throw new Error(ERROR_MESSAGES.FAST_LENGTH_GREATER)
    }
    const fastEMA = movingAverage(source, fastLength, 'ema')
    const slowEMA = movingAverage(source, slowLength, 'ema')
    const values = ArrayUtils.processArray(fastEMA, (fast, i) => {
      const slow = slowEMA[i]
      return fast !== undefined && slow !== undefined && !isNaN(fast) && !isNaN(slow) ? fast - slow : NaN
    })
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
 * Calculate Absolute Price Oscillator values
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @returns APO values array
 */
export function apo(data: MarketData | number[], fastLength: number = 12, slowLength: number = 26): number[] {
  return createIndicatorWrapper(APO, data, undefined, undefined, { fastLength, slowLength })
}
