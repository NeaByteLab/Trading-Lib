import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { createVolumeIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculatePriceVolumeTrend } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Calculate Price Volume Trend (PVT) using centralized utilities
 *
 * PVT measures cumulative volume-weighted price change.
 * It helps identify buying and selling pressure over time.
 *
 * @param data - Market data with OHLCV values
 * @param _length - Unused parameter for factory compatibility
 * @returns Array of PVT values
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculatePriceVolumeTrendWrapper(data: MarketData | number[], _length: number = 1): number[] {
  if (Array.isArray(data)) {
    throw new Error(ERROR_MESSAGES.MISSING_OHLCV)
  }
  validateVolumeData(data)
  return calculatePriceVolumeTrend(data.close, data.volume!)
}

const PriceVolumeTrend = createVolumeIndicator('Price Volume Trend', 'Cumulative volume-weighted price change', calculatePriceVolumeTrendWrapper, 1)

/**
 * Calculate Price Volume Trend (PVT)
 *
 * PVT measures cumulative volume-weighted price change.
 * Formula: PVT = Previous PVT + ((Close - Previous Close) / Previous Close) × Volume
 * Helps identify buying and selling pressure over time.
 *
 * @param data - Market data with OHLCV values
 * @returns Array of PVT values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const pvt = ta.priceVolumeTrend(marketData)
 * // Returns: [0, 1500, -800, 2200, ...]
 * ```
 */
export function priceVolumeTrend(data: MarketData): number[] {
  return createIndicatorWrapper(PriceVolumeTrend, data)
}
