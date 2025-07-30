import { BaseIndicator } from '@base/base-indicator';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Median Price Indicator
 *
 * Calculates the median of high and low prices.
 * Formula: Median Price = (High + Low) / 2
 *
 * @example
 * ```typescript
 * const medianPrice = new MedianPrice()
 * const result = medianPrice.calculate(marketData)
 * console.log(result.values) // Median price values
 * ```
 */
export class MedianPrice extends BaseIndicator {
    constructor() {
        super('MedianPrice', 'Median Price', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const values = this.calculateMedianPrice(data);
        return {
            values,
            metadata: {
                length: values.length,
                source: config?.source || 'hl2'
            }
        };
    }
    calculateMedianPrice(data) {
        return ArrayUtils.processArray(data.high, (high, i) => {
            const low = data.low[i];
            if (high === undefined || low === undefined) {
                return NaN;
            }
            return (high + low) / 2;
        });
    }
}
/**
 * Calculate Median Price values using wrapper function
 *
 * @param data - Market data
 * @returns Median price values array
 */
export function medianPrice(data) {
    return createIndicatorWrapper(MedianPrice, data);
}
