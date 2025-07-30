import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { MathUtils } from '@utils/math-utils'
import { validateIndicatorData } from '@utils/validation-utils'

/**
 * Calculate Percentage Trailing Stops
 *
 * Creates trailing stop levels that follow price movements at a
 * specified percentage distance. The stops move in the direction
 * of the trend but never move against it.
 *
 * @param data - Market data or price array
 * @param percentage - Trailing percentage
 * @returns Object with trailing stop values
 * @throws {Error} If data is invalid or parameters are out of range
 *
 * @example
 * ```typescript
 * const marketData = {
 *   close: [100, 102, 104, 103, 105]
 * }
 * const stops = percentageTrailingStops(marketData, 2.5)
 * console.log(stops.trailingStop) // Trailing stop values
 * ```
 */
export function percentageTrailingStops(data: MarketData | number[], percentage: number = 2.5): {
  trailingStop: number[]
} {
  validateIndicatorData(data)
  if (percentage <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER)
  }
  const source = Array.isArray(data) ? data : data.close
  const percentageMultiplier = percentage / 100
  const trailingStop: number[] = []
  for (let i = 0; i < source.length; i++) {
    const price = source[i]!
    if (i === 0) {
      trailingStop.push(price * (1 - percentageMultiplier))
    } else {
      const prevStop = trailingStop[i - 1]
      if (prevStop === undefined || isNaN(prevStop)) {
        trailingStop.push(price * (1 - percentageMultiplier))
      } else {
        const newStop = price * (1 - percentageMultiplier)
        trailingStop.push(MathUtils.max([prevStop, newStop]))
      }
    }
  }
  return { trailingStop }
}

/**
 * Percentage Trailing Stops Indicator Class
 */
export class PercentageTrailingStopsIndicator extends BaseIndicator {
  constructor() {
    super('Percentage Trailing Stops', 'Dynamic trailing stops based on percentage distance from price', 'trend')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    validateIndicatorData(data)
    const percentage = (config?.['percentage'] as number) || 2.5
    if (percentage <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const percentage = (config?.['percentage'] as number) || 2.5
    const result = percentageTrailingStops(data, percentage)
    return {
      values: result.trailingStop,
      metadata: {
        length: result.trailingStop.length,
        percentage,
        source: config?.source || 'close'
      }
    }
  }
}
