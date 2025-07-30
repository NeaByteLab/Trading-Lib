import { BaseIndicator } from '@core/base/base-indicator'
import { DEFAULT_LENGTHS } from '@core/constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateDonchianChannel } from '@core/utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@core/utils/indicator-utils'
import { pineLength } from '@core/utils/pine-script-utils'

/**
 * Donchian Channel Indicator
 *
 * A volatility indicator that shows the highest high and lowest low over a specified period.
 * Upper Band = Highest High, Lower Band = Lowest Low, Middle Band = (Upper + Lower) / 2
 *
 * @example
 * ```typescript
 * const donchian = new DonchianChannel()
 * const result = donchian.calculate(marketData, { length: 20 })
 * console.log(result.values) // Middle band values
 * console.log(result.metadata.upper) // Upper band values
 * console.log(result.metadata.lower) // Lower band values
 * ```
 */
export class DonchianChannel extends BaseIndicator {
  constructor() {
    super('Donchian', 'Donchian Channel', 'volatility')
  }

  calculate(data: MarketData, config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const length = pineLength(config?.length || DEFAULT_LENGTHS.DONCHIAN, DEFAULT_LENGTHS.DONCHIAN)
    const { upper, middle, lower } = this.calculateDonchianChannel(data, length)
    return {
      values: middle,
      metadata: {
        length,
        source: 'hlc3',
        upper,
        lower
      }
    }
  }

  private calculateDonchianChannel(data: MarketData, length: number): {
    upper: number[]
    middle: number[]
    lower: number[]
  } {
    return calculateDonchianChannel(data.high, data.low, length)
  }
}

/**
 * Calculate Donchian Channel values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @returns Object with upper, middle, and lower band arrays
 */
export function donchianChannel(data: MarketData, length?: number): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  const result = createMultiResultIndicatorWrapper(DonchianChannel, data, length)
  return {
    upper: result.metadata['upper'] as number[],
    middle: result.values,
    lower: result.metadata['lower'] as number[]
  }
}
