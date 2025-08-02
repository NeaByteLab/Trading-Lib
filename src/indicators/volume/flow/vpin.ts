import { createVolumeIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateVPIN } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Calculate VPIN (Volume-synchronized Probability of Informed Trading)
 *
 * VPIN measures the probability of informed trading using volume imbalance.
 * Formula: VPIN = |Buy Volume - Sell Volume| / Total Volume
 * Based on Easley, O'Hara, and Yang (2012) methodology.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 50)
 * @param buckets - Number of volume buckets (default: 50)
 * @param source - Price source (default: 'volume')
 * @returns Array of VPIN values (0-1)
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vpin = ta.vpin(marketData, 50, 50)
 * // Returns: [0.15, 0.25, 0.10, 0.30, ...]
 * ```
 */
function calculateVPINIndicator(data: MarketData | number[], length: number = 50, buckets: number = 50): number[] {
  if (Array.isArray(data)) {
    throw new Error('Market data required for VPIN calculation')
  }
  validateVolumeData(data)
  return calculateVPIN(data.close, data.volume!, length, buckets)
}

const VPINIndicator = createVolumeIndicator('VPIN', 'Volume-synchronized Probability of Informed Trading', calculateVPINIndicator, 50)

/**
 * Calculate VPIN values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 50)
 * @param buckets - Number of volume buckets (default: 50)
 * @param source - Price source (default: 'volume')
 * @returns VPIN values array
 */
export function vpin(data: MarketData | number[], length?: number, buckets?: number, source?: string): number[] {
  return createIndicatorWrapper(VPINIndicator, data, length, source, { buckets })
}
