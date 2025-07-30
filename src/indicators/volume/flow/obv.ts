import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { createVolumeIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateOBV } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Calculate OBV using centralized utilities
 *
 * @param data - Market data or price array
 * @param _length - Unused parameter for factory compatibility
 * @returns OBV values array
 */
function calculateOBVWrapper(data: MarketData | number[], _length: number = 1): number[] {
  if (Array.isArray(data)) {
    throw new Error(ERROR_MESSAGES.MISSING_OHLCV)
  }
  validateVolumeData(data)
  return calculateOBV(data.close, data.volume!)
}

const OBV = createVolumeIndicator('OBV', 'On Balance Volume', calculateOBVWrapper, 1)

/**
 * Calculate OBV values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 1)
 * @param source - Price source (default: 'close')
 * @returns OBV values array
 */
export function obv(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(OBV, data, length, source)
}
