import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'

/**
 * On Balance Volume (OBV) indicator
 *
 * Measures buying and selling pressure by adding volume on up days and subtracting on down days.
 * Formula: OBV = Previous OBV + Current Volume (if close > previous close)
 *         OBV = Previous OBV - Current Volume (if close < previous close)
 *
 * @example
 * ```typescript
 * const obv = new OBV()
 * const result = obv.calculate(marketData)
 * console.log(result.values) // OBV values
 * ```
 */
export class OBV extends BaseIndicator {
  constructor() {
    super('OBV', 'On Balance Volume', 'volume')
  }

  /**
   * Calculate OBV values
   *
   * @param data - Market data or price array
   * @param config - Indicator configuration
   * @returns OBV calculation result
   */
  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    pineSource(data, config?.source)
    const length = pineLength(config?.length || DEFAULT_LENGTHS.OBV, DEFAULT_LENGTHS.OBV)
    const values = this.calculateOBV(data as MarketData)
    return {
      values,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }

  /**
   * Calculate OBV using centralized utilities
   *
   * @param data - Market data
   * @returns OBV values array
   */
  private calculateOBV(data: MarketData): number[] {
    if (!data.volume) {
      throw new Error('Volume data is required for OBV calculation')
    }
    let obv = 0
    return ArrayUtils.processArray(data.close, (close, i) => {
      if (i === 0) {
        obv = data.volume![i]!
        return obv
      }
      const currentClose = close
      const previousClose = data.close[i - 1]!
      const currentVolume = data.volume![i]!
      if (isNaN(currentClose) || isNaN(previousClose) || isNaN(currentVolume)) {
        return NaN
      }
      if (currentClose > previousClose) {
        obv += currentVolume
      } else if (currentClose < previousClose) {
        obv -= currentVolume
      }
      return obv
    })
  }
}

/**
 * Calculate OBV values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 1)
 * @param source - Price source (default: 'close')
 * @returns OBV values array
 */
export function obv(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(OBV, data, length, source)
}
