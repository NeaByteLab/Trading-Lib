import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { calculateHighLowRange, calculateRangePercentage } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Williams %R indicator
 *
 * A momentum oscillator that measures overbought and oversold levels.
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @example
 * ```typescript
 * const williamsR = new WilliamsR()
 * const result = williamsR.calculate(marketData, { length: 14 })
 * console.log(result.values) // Williams %R values (-100 to 0)
 * ```
 */
export class WilliamsR extends BaseIndicator {
    constructor() {
        super('WilliamsR', 'Williams %R', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error('Williams %R requires OHLC market data');
        }
        const length = pineLength(config?.length || DEFAULT_LENGTHS.WILLIAMS_R, DEFAULT_LENGTHS.WILLIAMS_R);
        const values = this.calculateWilliamsR(data, length);
        return {
            values,
            metadata: {
                length,
                source: 'close'
            }
        };
    }
    calculateWilliamsR(data, length) {
        return ArrayUtils.processWindow(data.close, length, (_, i) => {
            // Use centralized utilities instead of manual slicing and calculations
            const { highest, lowest } = calculateHighLowRange(data.high, data.low, i, length);
            const currentClose = data.close[i];
            return calculateRangePercentage(currentClose, lowest, highest, -100);
        });
    }
}
/**
 * Calculate Williams %R values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Williams %R values array
 */
export function williamsR(data, length, source) {
    return createIndicatorWrapper(WilliamsR, data, length, source);
}
