import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateCCIFromOHLC } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength } from '@utils/pine-script-utils'

const DEFAULT_LENGTHS = {
  CCI: 20
}

/**
 * Commodity Channel Index (CCI) indicator
 *
 * A momentum oscillator that measures the current price level relative to an average price level.
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @example
 * ```typescript
 * const cci = new CCI()
 * const result = cci.calculate(marketData, { length: 20 })
 * console.log(result.values) // CCI values
 * ```
 */
export class CCI extends BaseIndicator {
  constructor() {
    super('CCI', 'Commodity Channel Index', 'momentum')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error('CCI requires OHLC market data')
    }
    const length = pineLength(config?.length || DEFAULT_LENGTHS.CCI, DEFAULT_LENGTHS.CCI)

    // Use the centralized CCI calculation utility
    const values = calculateCCIFromOHLC(data, length)

    return {
      values,
      metadata: {
        length,
        source: 'hlc3'
      }
    }
  }
}

/**
 * Calculate CCI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CCI values array
 */
export function cci(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(CCI, data, length, source)
}
