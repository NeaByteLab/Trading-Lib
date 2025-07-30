import { BaseIndicator } from '@base/base-indicator';
import { calculateWilliamsR } from '@utils/calculation-utils';
/**
 * Calculate Williams %R using centralized utilities
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Period length (default: 14)
 * @returns Williams %R values
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
 * Calculate Williams %R values using wrapper function
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Williams %R values
 */
export function williamsR(data, length, source) {
    const config = { length: length || 14, source: source || 'close' };
    return WilliamsR.calculate(data, config).values;
}
