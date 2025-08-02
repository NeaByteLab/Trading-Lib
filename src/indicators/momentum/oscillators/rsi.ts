import { createOscillatorIndicator } from '@core/factories/indicator-factory'
import { calculateRSI } from '@utils/calculation-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

const RSI = createOscillatorIndicator('RSI', 'Relative Strength Index', calculateRSI, 14)

/**
 * Relative Strength Index - measures momentum and overbought/oversold conditions
 * Formula: RSI = 100 - (100 / (1 + RS)) where RS = Average Gain / Average Loss
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns RSI values array
 *
 * @example
 * ```typescript
 * const rsi = ta.rsi(data.close, 14)
 * // Returns: [NaN, NaN, ..., 65.2, 67.8, ...]
 * ```
 */
export function rsi(data: number[], length: number = 14, source: string = 'close'): number[] {
  return createIndicatorWrapper(RSI, data, length, source)
}
