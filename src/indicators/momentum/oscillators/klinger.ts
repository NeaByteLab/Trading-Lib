import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateKlingerOscillator } from '@utils/calculations/oscillators'
import { pineLength } from '@utils/pine-script-utils'

/**
 * Klinger Oscillator indicator
 *
 * Klinger Oscillator combines price and volume to identify long-term trends.
 * Uses volume force and price force to determine trend direction.
 */
export class KlingerOscillator extends BaseIndicator {
  constructor() {
    super('Klinger Oscillator', 'Klinger Oscillator', 'momentum')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error('Klinger Oscillator requires OHLCV data')
    }
    if (!data.volume) {
      throw new Error('Volume data is required for Klinger Oscillator')
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const marketData = data as MarketData
    const shortPeriod = pineLength(config?.['shortPeriod'] as number || 34, 34)
    const longPeriod = pineLength(config?.['longPeriod'] as number || 55, 55)
    const values = calculateKlingerOscillator(marketData, shortPeriod, longPeriod)
    return {
      values,
      metadata: {
        length: shortPeriod,
        shortPeriod,
        longPeriod,
        source: 'hlc3'
      }
    }
  }
}

const KLINGER_INDICATOR = new KlingerOscillator()

/**
 * Calculate Klinger Oscillator values using wrapper function
 *
 * @param data - Market data
 * @param shortPeriod - Short period (default: 34)
 * @param longPeriod - Long period (default: 55)
 * @returns Klinger Oscillator values array
 */
export function klinger(data: MarketData, shortPeriod?: number, longPeriod?: number): number[] {
  const config: IndicatorConfig = {
    shortPeriod: shortPeriod || 34,
    longPeriod: longPeriod || 55
  }
  return KLINGER_INDICATOR.calculate(data, config).values
}
