import { createOscillatorIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateMomentum } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

const Momentum = createOscillatorIndicator('Momentum', 'Momentum Indicator', calculateMomentum, 10)

/**
 * Momentum Indicator - measures price momentum over specified period
 * Formula: Momentum = Current Price - Price n periods ago
 *
 * @param data - Market data or price array
 * @param length - Lookback period (default: 10)
 * @returns Momentum values array
 *
 * @example
 * ```typescript
 * const momentum = ta.momentum(data.close, 10)
 * // Returns: [NaN, NaN, ..., 2.5, 1.8, ...]
 * ```
 */
export function momentum(data: MarketData | number[], length: number = 10): number[] {
  return createIndicatorWrapper(Momentum, data, length)
}
