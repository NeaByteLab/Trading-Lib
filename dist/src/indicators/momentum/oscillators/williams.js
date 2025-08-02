import { BaseIndicator } from '@base/base-indicator';
import { calculateWilliamsR } from '@utils/calculation-utils';
/**
 * Williams %R - momentum oscillator measuring overbought/oversold levels
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Period length (default: 14)
 * @returns Williams %R values
 *
 * @example
 * ```typescript
 * const williams = ta.williamsR(data, 14)
 * // Returns: [NaN, NaN, ..., -25.6, -18.9, ...]
 * ```
 */
function calculateWilliamsRWrapper(data, length = 14) {
    return calculateWilliamsR(data.close, data.high, data.low, length);
}
class WilliamsRIndicator extends BaseIndicator {
    constructor() {
        super('Williams %R', 'Williams %R Oscillator', 'momentum');
    }
    validateInput(data, _config) {
        if (Array.isArray(data) || !data.high || !data.low || !data.close) {
            throw new Error('Williams %R requires MarketData with high, low, close arrays');
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const length = config?.length || 14;
        const values = calculateWilliamsRWrapper(marketData, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
const WilliamsR = new WilliamsRIndicator();
/**
 * Williams %R - momentum oscillator measuring overbought/oversold levels
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Williams %R values
 *
 * @example
 * ```typescript
 * const williams = ta.williamsR(data, 14)
 * // Returns: [NaN, NaN, ..., -25.6, -18.9, ...]
 * ```
 */
export function williamsR(data, length, source) {
    const config = { length: length || 14, source: source || 'close' };
    return WilliamsR.calculate(data, config).values;
}
