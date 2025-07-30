import { createOscillatorIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateTwiggsMomentum } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

const TwiggsMomentum = createOscillatorIndicator('TwiggsMomentum', 'Twiggs Momentum', calculateTwiggsMomentum, 20)

/**
 * Calculate Twiggs Momentum oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param lookback - Lookback period (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Twiggs Momentum values array
 */
export function twiggsMomentum(data: MarketData | number[], length?: number, lookback?: number, source?: string): number[] {
  return createIndicatorWrapper(TwiggsMomentum, data, length, source, { lookback })
}
