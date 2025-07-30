import { BaseIndicator } from '@core/base/base-indicator'
import { ERROR_MESSAGES } from '@core/constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { calculatePriceChannels } from '@core/utils/calculation-utils'
import { validateIndicatorData } from '@core/utils/validation-utils'

/**
 * Calculate Price Channels
 *
 * Creates upper and lower channels based on the highest high and
 * lowest low over a specified period. Useful for identifying
 * breakout and breakdown levels.
 *
 * @param data - Market data with OHLC values
 * @param length - Channel calculation period
 * @returns Object with upper and lower channel values
 * @throws {Error} If market data is invalid or length is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102]
 * }
 * const channels = priceChannels(marketData, 20)
 * console.log(channels.upper) // Upper channel values
 * console.log(channels.lower) // Lower channel values
 * ```
 */
export function priceChannels(data: MarketData, length: number = 20): {
  upper: number[]
  lower: number[]
} {
  validateIndicatorData(data)
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  return calculatePriceChannels(data.high, data.low, length)
}

/**
 * Price Channels Indicator Class
 */
export class PriceChannelsIndicator extends BaseIndicator {
  constructor() {
    super('Price Channels', 'Upper and lower channels based on highest high and lowest low', 'volatility')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    validateIndicatorData(data)
    const length = config?.length || 20
    if (length <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = config?.length || 20
    const result = priceChannels(data, length)
    return {
      values: ArrayUtils.processArray(result.upper, (upper, i) => {
        const lower = result.lower[i]
        if (upper === undefined || isNaN(upper) || lower === undefined || isNaN(lower)) {
          return NaN
        }
        return (upper + lower) / 2
      }),
      metadata: {
        length,
        upper: result.upper,
        lower: result.lower,
        source: config?.source || 'ohlc'
      }
    }
  }
}
