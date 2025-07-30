import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { createVolatilityIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { calculateHighLowRange, calculateRangePercentage } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Calculate Stochastic Oscillator using centralized utilities
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @returns %K values array
 */
function calculateStochastic(data: MarketData | number[], length: number = 14): number[] {
  if (Array.isArray(data)) {
    throw new Error(ERROR_MESSAGES.MISSING_OHLC)
  }
  const kLength = length
  return ArrayUtils.processWindow(data.close, kLength, (_, i) => {
    const { highest, lowest } = calculateHighLowRange(data.high, data.low, i, kLength)
    const currentClose = data.close[i]!
    return calculateRangePercentage(currentClose, lowest, highest, 100)
  })
}

const Stochastic = createVolatilityIndicator('Stochastic', 'Stochastic Oscillator', calculateStochastic, 14)

/**
 * Calculate Stochastic Oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param kLength - %K period (default: 14)
 * @param dLength - %D period (default: 3)
 * @param source - Price source (default: 'close')
 * @returns %K and %D values
 */
export function stochastic(data: MarketData | number[], kLength?: number, dLength?: number, source?: string): number[] {
  return createIndicatorWrapper(Stochastic, data, kLength, source, { dLength })
}
