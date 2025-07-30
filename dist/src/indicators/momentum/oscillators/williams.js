import { OscillatorIndicator } from '@base/oscillator-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { MathUtils } from '@utils/math-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Calculate Williams %R indicator
 *
 * Williams %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @param close - Close prices array
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Lookback period
 * @returns Williams %R values array
 */
function calculateWilliamsR(close, high, low, length) {
    return ArrayUtils.processArray(close, (currentClose, i) => {
        if (i < length - 1) {
            return NaN;
        }
        const windowHigh = ArrayUtils.getWindowSlice(high, i, length);
        const windowLow = ArrayUtils.getWindowSlice(low, i, length);
        const validHigh = windowHigh.filter(val => !isNaN(val));
        const validLow = windowLow.filter(val => !isNaN(val));
        if (validHigh.length === 0 || validLow.length === 0) {
            return NaN;
        }
        const highestHigh = MathUtils.max(validHigh);
        const lowestLow = MathUtils.min(validLow);
        const range = highestHigh - lowestLow;
        if (range === 0) {
            return NaN;
        }
        return ((highestHigh - currentClose) / range) * -100;
    });
}
/**
 * Williams %R Indicator
 *
 * Measures overbought/oversold levels using the relationship between close price and the highest high/lowest low over a period.
 * Values range from 0 to -100, with -80 to -100 indicating oversold and 0 to -20 indicating overbought.
 * Formula: Williams %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @example
 * ```typescript
 * const williams = new WilliamsRIndicator()
 * const result = williams.calculate(marketData, { length: 14 })
 * console.log(result.values) // Williams %R values
 * ```
 */
export class WilliamsRIndicator extends OscillatorIndicator {
    constructor() {
        super('WilliamsRIndicator', 'Williams %R', 14, 1);
    }
    calculateOscillator(_data, _length) {
        return [];
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        const length = pineLength(config?.length || 14, 14);
        const values = calculateWilliamsR(data.close, data.high, data.low, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate Williams %R using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Lookback period (default: 14)
 * @returns Williams %R values array
 */
export function williamsR(data, length = 14) {
    const indicator = new WilliamsRIndicator();
    const result = indicator.calculate(data, { length });
    return result.values;
}
