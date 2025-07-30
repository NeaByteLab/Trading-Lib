import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import { createVolumeIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateVAMA } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Calculate Volume Adjusted Moving Average (VAMA)
 *
 * VAMA = Σ(Price × Volume) / Σ(Volume) for the specified period
 * Similar to VWMA but with additional volume filtering
 *
 * @param data - Market data with OHLCV
 * @param length - Moving average period (default: 20)
 * @param volumeThreshold - Minimum volume threshold (default: 0)
 * @returns VAMA values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateVAMAIndicator(data: MarketData | number[], length: number = 20, volumeThreshold: number = 0): number[] {
  if (Array.isArray(data)) {
    throw new Error('Market data required for VAMA calculation')
  }
  validateVolumeData(data)
  return calculateVAMA(data.close, data.volume!, length, volumeThreshold)
}

const VAMAIndicator = createVolumeIndicator('VAMA', 'Volume Adjusted Moving Average', calculateVAMAIndicator, DEFAULT_LENGTHS.SMA)

/**
 * Calculate VAMA values using wrapper function
 *
 * @param data - Market data
 * @param length - Moving average period (default: 20)
 * @param volumeThreshold - Minimum volume threshold (default: 0)
 * @param source - Price source (default: 'close')
 * @returns VAMA values array
 */
export function vama(data: MarketData | number[], length?: number, volumeThreshold?: number, source?: string): number[] {
  return createIndicatorWrapper(VAMAIndicator, data, length, source, { volumeThreshold })
}
