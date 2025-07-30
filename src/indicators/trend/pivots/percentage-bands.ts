import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { BaseIndicator } from '@core/base/base-indicator'
import { movingAverage } from '@core/calculations/moving-averages'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { validateIndicatorData } from '@utils/validation-utils'

/**
 * Calculate Percentage Bands
 *
 * Creates dynamic support and resistance levels as a percentage
 * above and below a moving average. The bands adapt to price
 * movements and provide flexible trading levels.
 *
 * @param data - Market data or price array
 * @param length - Moving average period
 * @param percentage - Percentage deviation from moving average
 * @returns Object with upper, middle, and lower bands
 * @throws {Error} If data is invalid or parameters are out of range
 *
 * @example
 * ```typescript
 * const marketData = {
 *   close: [100, 102, 104, 103, 105]
 * }
 * const bands = percentageBands(marketData, 20, 2.5)
 * console.log(bands.upper) // Upper band values
 * console.log(bands.middle) // Middle band (SMA) values
 * console.log(bands.lower) // Lower band values
 * ```
 */
export function percentageBands(data: MarketData | number[], length: number = 20, percentage: number = 2.5): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  validateIndicatorData(data)
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  if (percentage <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER)
  }
  const source = Array.isArray(data) ? data : data.close
  const middle = movingAverage(source, length, 'sma')
  const percentageMultiplier = percentage / 100
  const upper = ArrayUtils.processArray(middle, (val) => {
    if (isNaN(val)) {return NaN}
    return val * (1 + percentageMultiplier)
  })
  const lower = ArrayUtils.processArray(middle, (val) => {
    if (isNaN(val)) {return NaN}
    return val * (1 - percentageMultiplier)
  })
  return { upper, middle, lower }
}

/**
 * Percentage Bands Indicator Class
 */
export class PercentageBandsIndicator extends BaseIndicator {
  constructor() {
    super('Percentage Bands', 'Dynamic support and resistance levels based on percentage deviation from moving average', 'trend')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    validateIndicatorData(data)
    const length = config?.length || 20
    if (length <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
    }
    const percentage = (config?.['percentage'] as number) || 2.5
    if (percentage <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const length = config?.length || 20
    const percentage = (config?.['percentage'] as number) || 2.5
    const result = percentageBands(data, length, percentage)
    return {
      values: result.middle,
      metadata: {
        length,
        percentage,
        upper: result.upper,
        lower: result.lower,
        source: config?.source || 'close'
      }
    }
  }
}
