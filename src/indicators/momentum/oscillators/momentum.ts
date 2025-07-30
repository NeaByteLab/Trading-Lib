import { createOscillatorIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Calculate Momentum indicator
 *
 * Momentum = Current Price - Price n periods ago
 *
 * @param data - Market data or price array
 * @param length - Lookback period (default: 10)
 * @returns Momentum values array
 */
function calculateMomentum(data: number[], length: number = 10): number[] {
  return ArrayUtils.processArray(data, (current, i) => {
    if (i < length) {
      return NaN
    }
    const previous = data[i - length]!
    return current - previous
  })
}

const Momentum = createOscillatorIndicator('Momentum', 'Momentum Indicator', calculateMomentum, 10)

/**
 * Calculate Momentum indicator
 *
 * @param data - Market data or price array
 * @param length - Lookback period (default: 10)
 * @returns Momentum values array
 */
export function momentum(data: MarketData | number[], length: number = 10): number[] {
  return createIndicatorWrapper(Momentum, data, length)
}
