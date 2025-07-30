import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateWilliamsR } from '@utils/calculation-utils'

/**
 * Calculate Williams %R using centralized utilities
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Period length (default: 14)
 * @returns Williams %R values
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
 * Calculate Williams %R values using wrapper function
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Williams %R values
 */
export function williamsR(data: MarketData, length?: number, source?: string): number[] {
  const config: IndicatorConfig = { length: length || 14, source: source || 'close' }
  return WilliamsR.calculate(data, config).values
}
