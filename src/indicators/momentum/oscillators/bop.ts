import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateBalanceOfPower } from '@utils/calculation-utils'

/**
 * Calculate Balance of Power using centralized utilities
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Period length (default: 14)
 * @returns Balance of Power values
 */
function calculateBOPWrapper(data: MarketData): number[] {
  return calculateBalanceOfPower(data)
}

class BalanceOfPowerIndicator extends BaseIndicator {
  constructor() {
    super('Balance of Power', 'Balance of Power Oscillator', 'momentum')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (Array.isArray(data) || !data.high || !data.low || !data.close) {
      throw new Error('BOP requires MarketData with high, low, close arrays')
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const marketData = data as MarketData
    const length = config?.length || 14
    const values = calculateBOPWrapper(marketData)
    return {
      values,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }
}

const BalanceOfPower = new BalanceOfPowerIndicator()

/**
 * Calculate Balance of Power values using wrapper function
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Balance of Power values
 */
export function balanceOfPower(data: MarketData, length?: number, source?: string): number[] {
  const config: IndicatorConfig = { length: length || 14, source: source || 'close' }
  return BalanceOfPower.calculate(data, config).values
}
