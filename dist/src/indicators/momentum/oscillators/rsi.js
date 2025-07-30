import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { calculateRSI } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
const RSI = createOscillatorIndicator('RSI', 'Relative Strength Index', calculateRSI, 14);
/**
 * Calculate RSI values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns RSI values array
 */
export function rsi(data, length = 14, source = 'close') {
    return createIndicatorWrapper(RSI, data, length, source);
}
