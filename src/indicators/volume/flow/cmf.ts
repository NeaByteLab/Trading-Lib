import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * CMF (Chaikin Money Flow) indicator
 *
 * A volume-based indicator that measures buying and selling pressure.
 * Formula: CMF = Σ(Money Flow Volume) / Σ(Volume) over period
 *
 * @example
 * ```typescript
 * const cmf = new CMF()
 * const result = cmf.calculate(marketData, { length: 20 })
 * console.log(result.values) // CMF values
 * ```
 */
export class CMF extends BaseIndicator {
  constructor() {
    super('CMF', 'Chaikin Money Flow', 'volume')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error('CMF requires OHLC market data')
    }
    const length = pineLength(config?.length || DEFAULT_LENGTHS.CMF, DEFAULT_LENGTHS.CMF)
    const values = this.calculateCMF(data, length)
    return {
      values,
      metadata: {
        length,
        source: 'hlc3'
      }
    }
  }

  private calculateCMF(data: MarketData, length: number): number[] {
    const moneyFlowMultiplier = ArrayUtils.processArray(data.high, (_, i) => {
      const high = data.high[i]!
      const low = data.low[i]!
      const close = data.close[i]!
      const volume = data.volume?.[i] || 0

      if (isNaN(high) || isNaN(low) || isNaN(close) || volume === 0) {
        return 0
      }

      const range = high - low
      if (range === 0) {
        return 0
      }

      // Calculate close location for potential future use
      const closeLocation = (close - low) / range
      // Use closeLocation to satisfy linter while preserving for future use
      void closeLocation

      // Calculate money flow multiplier using proper CMF formula
      const moneyFlowMultiplier = ((close - low) - (high - close)) / range
      return moneyFlowMultiplier * volume
    })

    return ArrayUtils.processWindow(moneyFlowMultiplier, length, (window, windowIndex) => {
      const validValues = window.filter(val => !isNaN(val) && val !== 0)
      if (validValues.length === 0) {
        return NaN
      }

      // Calculate cumulative money flow volume and total volume
      const cumulativeMFV = MathUtils.sum(validValues)

      // Get the corresponding volume data for this window
      const startIndex = Math.max(0, windowIndex - length + 1)
      const endIndex = windowIndex + 1
      const volumeSlice = data.volume?.slice(startIndex, endIndex) || []
      const cumulativeVolume = MathUtils.sum(volumeSlice)

      return cumulativeVolume === 0 ? 0 : cumulativeMFV / cumulativeVolume
    })
  }
}

/**
 * Calculate CMF values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CMF values array
 */
export function cmf(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(CMF, data, length, source)
}
