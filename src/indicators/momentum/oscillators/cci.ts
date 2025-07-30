import { createVolatilityIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateCCI, calculateCCIFromOHLC } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Calculate CCI using centralized utilities
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @returns CCI values array
 */
function calculateCCIIndicator(data: MarketData | number[], length: number = 20): number[] {
  if (Array.isArray(data)) {
    return calculateCCI(data, length)
  }
  return calculateCCIFromOHLC(data, length)
}

const CCI = createVolatilityIndicator('CCI', 'Commodity Channel Index', calculateCCIIndicator, 20)

/**
 * Calculate CCI values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CCI values array
 */
export function cci(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(CCI, data, length, source)
}
