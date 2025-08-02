import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { createVolumeIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculatePositiveVolumeIndex } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Calculate Positive Volume Index (PVI) using centralized utilities
 *
 * PVI measures price changes only on days when volume increases.
 * It helps identify smart money movements and trend strength.
 *
 * @param data - Market data with OHLCV values
 * @param _length - Unused parameter for factory compatibility
 * @returns Array of PVI values
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculatePositiveVolumeIndexWrapper(data: MarketData | number[], _length: number = 1): number[] {
  if (Array.isArray(data)) {
    throw new Error(ERROR_MESSAGES.MISSING_OHLCV)
  }
  validateVolumeData(data)
  return calculatePositiveVolumeIndex(data.close, data.volume!)
}

const PositiveVolumeIndex = createVolumeIndicator('Positive Volume Index', 'Measures price changes only on days with increased volume', calculatePositiveVolumeIndexWrapper, 1)

/**
 * Calculate Positive Volume Index (PVI)
 *
 * PVI measures price changes only on days when volume increases.
 * Formula: PVI = Previous PVI × (1 + (Current Close - Previous Close) / Previous Close)
 * Only updates when current volume > previous volume.
 *
 * @param data - Market data with OHLCV values
 * @returns Array of PVI values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const pvi = ta.positiveVolumeIndex(marketData)
 * // Returns: [1000, 1050, 1100, 1150, ...]
 * ```
 */
export function positiveVolumeIndex(data: MarketData): number[] {
  return createIndicatorWrapper(PositiveVolumeIndex, data)
}
