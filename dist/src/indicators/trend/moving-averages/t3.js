import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Calculate T3 Moving Average
 *
 * T3 = GD(GD(GD(price))) where GD = (a * EMA) + ((1 - a) * EMA(EMA))
 * Provides smooth trend-following with reduced lag and noise.
 *
 * @param data - Price data array
 * @param length - Calculation period (default: 20)
 * @param a - Smoothing factor (default: 0.7)
 * @returns T3 values array
 * @throws {Error} If data is empty or parameters are invalid
 */
function calculateT3(data, length = 20, a = 0.7) {
    const ema1 = movingAverage(data, length, 'ema');
    const ema2 = movingAverage(ema1, length, 'ema');
    const gd1 = ArrayUtils.processArray(ema1, (val1, i) => {
        const val2 = ema2[i];
        if (val1 === undefined || val2 === undefined || isNaN(val1) || isNaN(val2)) {
            return NaN;
        }
        return a * val1 + (1 - a) * val2;
    });
    const ema3 = movingAverage(gd1, length, 'ema');
    const ema4 = movingAverage(ema3, length, 'ema');
    const gd2 = ArrayUtils.processArray(ema3, (val3, i) => {
        const val4 = ema4[i];
        if (val3 === undefined || val4 === undefined || isNaN(val3) || isNaN(val4)) {
            return NaN;
        }
        return a * val3 + (1 - a) * val4;
    });
    const ema5 = movingAverage(gd2, length, 'ema');
    const ema6 = movingAverage(ema5, length, 'ema');
    return ArrayUtils.processArray(ema5, (val5, i) => {
        const val6 = ema6[i];
        if (val5 === undefined || val6 === undefined || isNaN(val5) || isNaN(val6)) {
            return NaN;
        }
        return a * val5 + (1 - a) * val6;
    });
}
/**
 * T3 Moving Average Indicator
 *
 * T3 = GD(GD(GD(price))) where GD = (a * EMA) + ((1 - a) * EMA(EMA))
 * Provides smooth trend-following with reduced lag and noise.
 *
 * @example
 * ```typescript
 * const t3 = new T3()
 * const result = t3.calculate(marketData, { length: 20, a: 0.7 })
 * console.log(result.values) // T3 values
 * ```
 */
export class T3 extends BaseIndicator {
    constructor() {
        super('T3', 'T3 Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.EMA, DEFAULT_LENGTHS.EMA);
        const a = config?.['a'] || 0.7;
        const values = calculateT3(source, length, a);
        return {
            values,
            metadata: {
                length,
                a,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate T3 values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param a - Smoothing factor (default: 0.7)
 * @param source - Price source (default: 'close')
 * @returns T3 values array
 */
export function t3(data, length, a, source) {
    return createIndicatorWrapper(T3, data, length, source, { a });
}
