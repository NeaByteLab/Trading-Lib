import { VolatilityIndicator } from '@core/base/volatility-indicator'
import { ERROR_MESSAGES } from '@core/constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateTrueRange, wildersSmoothing } from '@core/utils/calculation-utils'
import { pineLength } from '@core/utils/pine-script-utils'

/**
 * Average True Range (ATR) Indicator
 *
 * Measures market volatility by calculating the average of true range values.
 * True range is the greatest of: current high-low, |current high - previous close|, |current low - previous close|.
 * Higher ATR values indicate higher volatility.
 *
 * @example
 * ```typescript
 * const atr = new ATRIndicator()
 * const result = atr.calculate(marketData, { length: 14 })
 * console.log(result.values) // ATR values
 * ```
 */
export class ATRIndicator extends VolatilityIndicator {
  constructor() {
    super('ATRIndicator', 'Average True Range', 14, 1.0, 1)
  }

  protected calculateVolatility(_data: number[], _length: number, _multiplier: number): number[] {
    return []
  }

  override calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = pineLength(config?.length || 14, 14)
    const trueRanges = calculateTrueRange(data.high, data.low, data.close)
    const atrValues = wildersSmoothing(trueRanges, length)
    return {
      values: atrValues,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Average True Range (ATR) using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Calculation period (default: 14)
 * @returns ATR values array
 */
export function atr(data: MarketData, length: number = 14): number[] {
  const indicator = new ATRIndicator()
  const result = indicator.calculate(data, { length })
  return result.values
}
