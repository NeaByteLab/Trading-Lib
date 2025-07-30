import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { calculateRSI } from '@utils/calculation-utils';
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
    const instance = new RSI();
    const config = {};
    if (length !== undefined) {
        config.length = length;
    }
    if (source !== undefined) {
        config.source = source;
    }
    const result = instance.calculate(data, config);
    return result.values;
}
