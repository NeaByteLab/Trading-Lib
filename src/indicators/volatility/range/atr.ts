import { BaseIndicator } from '@base/base-indicator'
import { trueRange } from '@calculations/volatility/true-range'
import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { wildersSmoothing } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * Average True Range (ATR) indicator
 *
 * Measures market volatility by calculating the average of true ranges over a period.
 * Formula: ATR = Wilder's Smoothing(True Range) over period
 *
 * @example
 * ```typescript
 * const atr = new ATR()
 * const result = atr.calculate(marketData, { length: 14 })
 * console.log(result.values) // ATR values
 * ```
 */
export class ATR extends BaseIndicator {
  constructor() {
    super('ATR', 'Average True Range', 'volatility')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)

    if (Array.isArray(data)) {
      throw new Error('ATR requires OHLC market data')
    }

    const length = pineLength(config?.length || DEFAULT_LENGTHS.ATR, DEFAULT_LENGTHS.ATR)
    const values = this.calculateATR(data, length)

    return {
      values,
      metadata: {
        length,
        source: 'hlc3'
      }
    }
  }

  private calculateATR(data: MarketData, length: number): number[] {
    const trValues = trueRange(data)
    return wildersSmoothing(trValues, length)
  }
}

/**
 * Calculate ATR values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns ATR values array
 */
export function atr(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(ATR, data, length, source)
}
