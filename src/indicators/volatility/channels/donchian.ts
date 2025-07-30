import { VolatilityIndicator } from '@base/volatility-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { MathUtils } from '@utils/math-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * Calculate Donchian Channel
 *
 * Upper Band = Highest High over n periods
 * Lower Band = Lowest Low over n periods
 * Middle Band = (Upper + Lower) / 2
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Lookback period
 * @returns Object with upper, middle, and lower bands
 */
function calculateDonchianChannel(high: number[], low: number[], length: number): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  const upper = ArrayUtils.processArray(high, (_, i) => {
    if (i < length - 1) {
      return NaN
    }
    const window = ArrayUtils.getWindowSlice(high, i, length)
    const validValues = window.filter(val => !isNaN(val))
    return validValues.length > 0 ? MathUtils.max(validValues) : NaN
  })
  const lower = ArrayUtils.processArray(low, (_, i) => {
    if (i < length - 1) {
      return NaN
    }
    const window = ArrayUtils.getWindowSlice(low, i, length)
    const validValues = window.filter(val => !isNaN(val))
    return validValues.length > 0 ? MathUtils.min(validValues) : NaN
  })
  const middle = ArrayUtils.processArray(upper, (upperVal, i) => {
    const lowerVal = lower[i]
    return !isNaN(upperVal) && lowerVal !== undefined && !isNaN(lowerVal) ? (upperVal + lowerVal) / 2 : NaN
  })
  return { upper, middle, lower }
}

/**
 * Donchian Channel Indicator
 *
 * Measures volatility by calculating the highest high and lowest low over a period.
 * Upper band = highest high, lower band = lowest low, middle band = average of both.
 *
 * @example
 * ```typescript
 * const donchian = new DonchianChannelIndicator()
 * const result = donchian.calculate(marketData, { length: 20 })
 * console.log(result.values) // Middle band values
 * console.log(result.metadata.upper) // Upper band values
 * console.log(result.metadata.lower) // Lower band values
 * ```
 */
export class DonchianChannelIndicator extends VolatilityIndicator {
  constructor() {
    super('DonchianChannelIndicator', 'Donchian Channel', 20, 1.0, 1)
  }

  protected calculateVolatility(_data: number[], _length: number, _multiplier: number): number[] {
    return []
  }

  override calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = pineLength(config?.length || 20, 20)
    const { upper, middle, lower } = calculateDonchianChannel(data.high, data.low, length)
    return {
      values: middle,
      metadata: {
        length,
        upper,
        lower,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Donchian Channel using wrapper function
 *
 * @param data - Market data with high, low arrays
 * @param length - Lookback period (default: 20)
 * @returns Object with upper, middle, and lower bands
 */
export function donchianChannel(data: MarketData, length: number = 20): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  const indicator = new DonchianChannelIndicator()
  const result = indicator.calculate(data, { length })
  return {
    upper: result.metadata['upper'] as number[],
    middle: result.values,
    lower: result.metadata['lower'] as number[]
  }
}
