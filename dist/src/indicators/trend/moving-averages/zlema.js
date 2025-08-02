import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
/**
 * Calculate Zero Lag Exponential Moving Average (ZLEMA)
 * ZLEMA = EMA(2 * price - lagged_price)
 *
 * @param data - Price data array
 * @param length - Calculation period (default: 20)
 * @returns Array of ZLEMA values
 */
function calculateZLEMA(data, length = 20) {
    if (data.length === 0) {
        return [];
    }
    // Calculate lag period (typically length/2)
    const lagPeriod = MathUtils.floor(length / 2);
    // Calculate lagged prices
    const laggedPrices = ArrayUtils.processArray(data, (_, i) => {
        if (i < lagPeriod) {
            return NaN;
        }
        return data[i - lagPeriod];
    });
    // Calculate error term (price - lagged_price)
    const error = ArrayUtils.processArray(data, (_, i) => {
        if (isNaN(laggedPrices[i])) {
            return NaN;
        }
        return data[i] - laggedPrices[i];
    });
    // Calculate ZLEMA using EMA of error-corrected prices
    const zlema = [];
    let ema = 0;
    const multiplier = 2 / (length + 1);
    for (let i = 0; i < data.length; i++) {
        if (isNaN(error[i])) {
            zlema.push(NaN);
            continue;
        }
        // Error-corrected price = 2 * price - lagged_price
        const correctedPrice = 2 * data[i] - laggedPrices[i];
        if (i === 0 || isNaN(zlema[i - 1])) {
            ema = correctedPrice;
        }
        else {
            ema = (correctedPrice * multiplier) + (ema * (1 - multiplier));
        }
        zlema.push(ema);
    }
    return zlema;
}
/**
 * Zero Lag Exponential Moving Average (ZLEMA) Indicator
 *
 * Reduces lag by removing the lag from a simple moving average.
 * Uses error correction to minimize the delay between price changes and indicator response.
 * More responsive than traditional EMA while maintaining smoothness.
 *
 * @example
 * ```typescript
 * const zlema = new ZLEMA()
 * const result = zlema.calculate(closePrices, { length: 20 })
 * console.log(result.values) // ZLEMA values
 * ```
 */
export class ZLEMA extends BaseIndicator {
    constructor() {
        super('ZLEMA', 'Zero Lag Exponential Moving Average', 'trend');
    }
    validateInput(_data, config) {
        const length = config?.['length'] || 20;
        if (length <= 0) {
            throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const length = config?.['length'] || 20;
        const source = config?.source || 'close';
        let priceData;
        if (Array.isArray(data)) {
            priceData = data;
        }
        else {
            priceData = data[source];
        }
        const values = calculateZLEMA(priceData, length);
        return {
            values,
            metadata: {
                length: values.length,
                period: length,
                source
            }
        };
    }
}
/**
 * Calculate Zero Lag Exponential Moving Average using wrapper function
 *
 * @param data - Price data array or market data
 * @param length - Calculation period (default: 20)
 * @returns Array of ZLEMA values
 */
export function zlema(data, length = 20) {
    return createIndicatorWrapper(ZLEMA, data, length);
}
