import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateVolumeProfile } from '@utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Volume Profile Indicator
 *
 * Creates a volume distribution across price levels
 * Groups volume by price ranges to show volume concentration
 */
export class VolumeProfile extends BaseIndicator {
  constructor() {
    super('Volume Profile', 'Volume Profile', 'volume')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error('Market data required for Volume Profile calculation')
    }
    validateVolumeData(data)
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const marketData = data as MarketData
    const levels = (config?.['levels'] as number) || 10
    const result = calculateVolumeProfile(marketData.close, marketData.volume!, levels)
    return {
      values: result.volumeDistribution,
      metadata: {
        length: result.volumeDistribution.length,
        source: config?.source || 'close',
        priceLevels: result.priceLevels,
        volumeDistribution: result.volumeDistribution,
        poc: result.poc
      }
    }
  }
}

/**
 * Calculate Volume Profile values using wrapper function
 *
 * @param data - Market data
 * @param levels - Number of price levels (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Object with price levels and volume distribution
 */
export function volumeProfile(data: MarketData | number[], levels?: number, source?: string): {
  priceLevels: number[]
  volumeDistribution: number[]
  poc: number
} {
  const result = createMultiResultIndicatorWrapper(VolumeProfile, data, levels, source)
  return {
    priceLevels: result.metadata['priceLevels'] as number[],
    volumeDistribution: result.metadata['volumeDistribution'] as number[],
    poc: result.metadata['poc'] as number
  }
}
