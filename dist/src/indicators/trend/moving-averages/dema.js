import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Calculate Double Exponential Moving Average (DEMA)
 *
 * DEMA = 2 * EMA(price, length) - EMA(EMA(price, length), length)
 * Reduces lag compared to simple EMA while maintaining trend-following characteristics.
 *
 * @param data - Price data array
 * @param length - Calculation period (default: 20)
 * @returns DEMA values array
 * @throws {Error} If data is empty or length is invalid
 */
function calculateDEMA(data, length = 20) {
    const ema1 = movingAverage(data, length, 'ema');
    const ema2 = movingAverage(ema1, length, 'ema');
    return ArrayUtils.processArray(ema1, (val1, i) => {
        const val2 = ema2[i];
        if (val1 === undefined || val2 === undefined || isNaN(val1) || isNaN(val2)) {
            return NaN;
        }
        return 2 * val1 - val2;
    });
}
/**
 * Double Exponential Moving Average (DEMA) Indicator
 *
 * DEMA = 2 * EMA(price, length) - EMA(EMA(price, length), length)
 * Reduces lag compared to simple EMA while maintaining trend-following characteristics.
 *
 * @example
 * ```typescript
 * const dema = new DEMA()
 * const result = dema.calculate(marketData, { length: 20 })
 * console.log(result.values) // DEMA values
 * ```
 */
export class DEMA extends BaseIndicator {
    constructor() {
        super('DEMA', 'Double Exponential Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.EMA, DEFAULT_LENGTHS.EMA);
        const values = calculateDEMA(source, length);
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
 * Calculate DEMA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns DEMA values array
 */
export function dema(data, length, source) {
    return createIndicatorWrapper(DEMA, data, length, source);
}
