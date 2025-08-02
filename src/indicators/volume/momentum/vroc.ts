import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import { createVolumeIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateVolumeRateOfChange } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Calculate Volume Rate of Change (VROC)
 *
 * VROC measures the rate of change in volume over a specified period.
 * Formula: VROC = ((Current Volume - Volume n periods ago) / Volume n periods ago) × 100
 *
 * @param data - Market data with OHLCV values
 * @param length - Lookback period (default: 14)
 * @param source - Price source (default: 'volume')
 * @returns Array of VROC values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vroc = ta.vroc(marketData, 14)
 * // Returns: [0, 20, -10, 30, ...]
 * ```
 */
function calculateVROCIndicator(data: MarketData | number[], length: number = 14): number[] {
  if (Array.isArray(data)) {
    throw new Error('Market data required for VROC calculation')
  }
  validateVolumeData(data)
  return calculateVolumeRateOfChange(data.volume!, length)
}

const VROCIndicator = createVolumeIndicator('VROC', 'Volume Rate of Change', calculateVROCIndicator, DEFAULT_LENGTHS.ROC)

/**
 * Calculate VROC values using wrapper function
 *
 * @param data - Market data
 * @param length - Lookback period (default: 14)
 * @param source - Price source (default: 'volume')
 * @returns VROC values array
 */
export function vroc(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(VROCIndicator, data, length, source)
}
