import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateWilliamsR } from '@utils/calculation-utils'

/**
 * Williams %R - momentum oscillator measuring overbought/oversold levels
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Period length (default: 14)
 * @returns Williams %R values
 *
 * @example
 * ```typescript
 * const williams = ta.williamsR(data, 14)
 * // Returns: [NaN, NaN, ..., -25.6, -18.9, ...]
 * ```
 */
function calculateWilliamsRWrapper(data: MarketData, length: number = 14): number[] {
  return calculateWilliamsR(data.close, data.high, data.low, length)
}

class WilliamsRIndicator extends BaseIndicator {
  constructor() {
    super('Williams %R', 'Williams %R Oscillator', 'momentum')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (Array.isArray(data) || !data.high || !data.low || !data.close) {
      throw new Error('Williams %R requires MarketData with high, low, close arrays')
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const marketData = data as MarketData
    const length = config?.length || 14
    const values = calculateWilliamsRWrapper(marketData, length)
    return {
      values,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }
}

const WilliamsR = new WilliamsRIndicator()

/**
 * Williams %R - momentum oscillator measuring overbought/oversold levels
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Williams %R values
 *
 * @example
 * ```typescript
 * const williams = ta.williamsR(data, 14)
 * // Returns: [NaN, NaN, ..., -25.6, -18.9, ...]
 * ```
 */
export function williamsR(data: MarketData, length?: number, source?: string): number[] {
  const config: IndicatorConfig = { length: length || 14, source: source || 'close' }
  return WilliamsR.calculate(data, config).values
}
