import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Calculate Triple Exponential Moving Average (TEMA)
 *
 * TEMA = 3 * EMA(price, length) - 3 * EMA(EMA(price, length), length) + EMA(EMA(EMA(price, length), length), length)
 * Provides even more lag reduction than DEMA while maintaining trend-following characteristics.
 *
 * @param data - Price data array
 * @param length - Calculation period (default: 20)
 * @returns TEMA values array
 * @throws {Error} If data is empty or length is invalid
 */
function calculateTEMA(data, length = 20) {
    const ema1 = movingAverage(data, length, 'ema');
    const ema2 = movingAverage(ema1, length, 'ema');
    const ema3 = movingAverage(ema2, length, 'ema');
    return ArrayUtils.processArray(ema1, (val1, i) => {
        const val2 = ema2[i];
        const val3 = ema3[i];
        if (val1 === undefined || val2 === undefined || val3 === undefined ||
            isNaN(val1) || isNaN(val2) || isNaN(val3)) {
            return NaN;
        }
        return 3 * val1 - 3 * val2 + val3;
    });
}
/**
 * Triple Exponential Moving Average (TEMA) Indicator
 *
 * TEMA = 3 * EMA(price, length) - 3 * EMA(EMA(price, length), length) + EMA(EMA(EMA(price, length), length), length)
 * Provides even more lag reduction than DEMA while maintaining trend-following characteristics.
 *
 * @example
 * ```typescript
 * const tema = new TEMA()
 * const result = tema.calculate(marketData, { length: 20 })
 * console.log(result.values) // TEMA values
 * ```
 */
export class TEMA extends BaseIndicator {
    constructor() {
        super('TEMA', 'Triple Exponential Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.EMA, DEFAULT_LENGTHS.EMA);
        const values = calculateTEMA(source, length);
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
 * Calculate TEMA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns TEMA values array
 */
export function tema(data, length, source) {
    return createIndicatorWrapper(TEMA, data, length, source);
}
