import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import { createVolumeIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateVWAP } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Calculate Volume Weighted Average Price (VWAP)
 *
 * VWAP = Σ(Price × Volume) / Σ(Volume)
 * Uses centralized calculation utilities for consistency.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @returns VWAP values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateVWAPIndicator(data: MarketData | number[], length: number = 20): number[] {
  if (Array.isArray(data)) {
    throw new Error('Market data required for VWAP calculation')
  }
  validateVolumeData(data)
  return calculateVWAP(data, length)
}

const VWAPIndicator = createVolumeIndicator('VWAP', 'Volume Weighted Average Price', calculateVWAPIndicator, DEFAULT_LENGTHS.VWAP)

/**
 * Calculate VWAP values using wrapper function
 *
 * VWAP is the average price weighted by volume over a specified period.
 * Formula: VWAP = Σ(Price × Volume) / Σ(Volume)
 * Uses typical price (HLC3) as the price component.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of VWAP values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vwap = ta.vwap(marketData, 20)
 * // Returns: [100.5, 101.2, 102.1, 101.8, ...]
 * ```
 */
export function vwap(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(VWAPIndicator, data, length, source)
}
