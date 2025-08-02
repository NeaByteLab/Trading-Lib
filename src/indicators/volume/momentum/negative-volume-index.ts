import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateNegativeVolumeIndex } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Negative Volume Index Indicator
 *
 * NVI measures price changes only on days when volume decreases.
 * Formula: NVI = Previous NVI × (1 + (Current Close - Previous Close) / Previous Close)
 * Only updates when current volume < previous volume.
 *
 * @example
 * ```typescript
 * const nvi = new NegativeVolumeIndexIndicator()
 * const result = nvi.calculate(marketData)
 * console.log(result.values) // NVI values
 * ```
 */
export class NegativeVolumeIndexIndicator extends BaseIndicator {
  constructor() {
    super('NVI', 'Negative Volume Index', 'volume')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLCV)
    }
    validateVolumeData(data)
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const marketData = data as MarketData
    const values = calculateNegativeVolumeIndex(marketData.close, marketData.volume!)
    return {
      values,
      metadata: {
        source: 'close',
        volume: true,
        length: 1
      }
    }
  }
}

/**
 * Calculate Negative Volume Index (NVI)
 *
 * NVI measures price changes only on days when volume decreases.
 * Formula: NVI = Previous NVI × (1 + (Current Close - Previous Close) / Previous Close)
 * Only updates when current volume < previous volume.
 *
 * @param data - Market data with OHLCV values
 * @returns Array of NVI values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const nvi = ta.negativeVolumeIndex(marketData)
 * // Returns: [1000, 1050, 1100, 1150, ...]
 * ```
 */
export function negativeVolumeIndex(data: MarketData): number[] {
  return createIndicatorWrapper(NegativeVolumeIndexIndicator, data)
}
