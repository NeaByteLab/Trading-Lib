import { BaseIndicator } from '@base/base-indicator';
import { calculateBalanceOfPower } from '@utils/calculation-utils';
/**
 * Calculate Balance of Power using centralized utilities
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Period length (default: 14)
 * @returns Balance of Power values
 */
function calculateBOPWrapper(data) {
    return calculateBalanceOfPower(data);
}
class BalanceOfPowerIndicator extends BaseIndicator {
    constructor() {
        super('Balance of Power', 'Balance of Power Oscillator', 'momentum');
    }
    validateInput(data, _config) {
        if (Array.isArray(data) || !data.high || !data.low || !data.close) {
            throw new Error('BOP requires MarketData with high, low, close arrays');
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const length = config?.length || 14;
        const values = calculateBOPWrapper(marketData);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
const BalanceOfPower = new BalanceOfPowerIndicator();
/**
 * Calculate Balance of Power values using wrapper function
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Balance of Power values
 */
export function balanceOfPower(data, length, source) {
    const config = { length: length || 14, source: source || 'close' };
    return BalanceOfPower.calculate(data, config).values;
}
