import { BaseIndicator } from '@base/base-indicator';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Typical Price Indicator
 *
 * Typical Price is a simple price calculation that represents the average of high, low, and close.
 * Formula: TP = (High + Low + Close) / 3
 * Used as a basis for many other technical indicators and analysis.
 *
 * @example
 * ```typescript
 * const typical = new TypicalPrice()
 * const result = typical.calculate(marketData)
 * console.log(result.values) // Typical Price values
 * ```
 */
export class TypicalPrice extends BaseIndicator {
    constructor() {
        super('TypicalPrice', 'Typical Price', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const values = this.calculateTypicalPrice(data);
        return {
            values,
            metadata: {
                length: values.length,
                source: 'hlc3'
            }
        };
    }
    calculateTypicalPrice(data) {
        return ArrayUtils.processArray(data.high, (high, i) => {
            const low = data.low[i];
            const close = data.close[i];
            const result = (high + low + close) / 3;
            return isFinite(result) ? result : NaN;
        });
    }
}
/**
 * Calculate Typical Price values using wrapper function
 *
 * @param data - Market data
 * @returns Typical Price values array
 */
export function typicalPrice(data) {
    return createIndicatorWrapper(TypicalPrice, data);
}
