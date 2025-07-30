import { createOscillatorIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateTRIX } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

const TRIX = createOscillatorIndicator('TRIX', 'TRIX Oscillator', calculateTRIX, 18)

/**
 * Calculate TRIX oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 18)
 * @param source - Price source (default: 'close')
 * @returns TRIX values array
 */
export function trix(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(TRIX, data, length, source)
}
