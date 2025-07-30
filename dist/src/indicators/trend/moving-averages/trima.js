import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Calculate Triangular Moving Average (TRIMA)
 *
 * TRIMA is a double-smoothed simple moving average that gives more weight to the middle values.
 * Formula: TRIMA = SMA(SMA(price, length), length)
 * The triangular weighting reduces noise while maintaining responsiveness.
 *
 * @param data - Price data array
 * @param length - Calculation period (default: 20)
 * @returns TRIMA values array
 * @throws {Error} If data is empty or length is invalid
 */
function calculateTRIMA(data, length = 20) {
    if (data.length === 0) {
        return [];
    }
    const sma1 = movingAverage(data, length, 'sma');
    return movingAverage(sma1, length, 'sma');
}
/**
 * Triangular Moving Average (TRIMA) Indicator
 *
 * TRIMA is a double-smoothed simple moving average that gives more weight to the middle values.
 * Formula: TRIMA = SMA(SMA(price, length), length)
 * The triangular weighting reduces noise while maintaining responsiveness.
 *
 * @example
 * ```typescript
 * const trima = new TRIMA()
 * const result = trima.calculate(marketData, { length: 20 })
 * console.log(result.values) // TRIMA values
 * ```
 */
export class TRIMA extends BaseIndicator {
    constructor() {
        super('TRIMA', 'Triangular Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.SMA, DEFAULT_LENGTHS.SMA);
        const values = calculateTRIMA(source, length);
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
 * Calculate TRIMA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns TRIMA values array
 */
export function trima(data, length, source) {
    return createIndicatorWrapper(TRIMA, data, length, source);
}
