import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { ArrayUtils } from '@utils/array-utils';
import { calculateWindowSum } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Mass Index Indicator
 *
 * Identifies trend reversals by analyzing range expansion and contraction.
 * Formula: MI = Sum of EMA(High-Low) over 9 periods / EMA(EMA(High-Low)) over 9 periods
 *
 * @example
 * ```typescript
 * const massIndex = new MassIndex()
 * const result = massIndex.calculate(marketData, { length: 9 })
 * console.log(result.values) // Mass Index values
 * ```
 */
export class MassIndex extends BaseIndicator {
    constructor() {
        super('MassIndex', 'Mass Index', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const length = pineLength(config?.length || 9, 9);
        const values = this.calculateMassIndex(data, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'hl2'
            }
        };
    }
    calculateMassIndex(data, length) {
        const ranges = ArrayUtils.processArray(data.high, (high, i) => {
            const low = data.low[i];
            return high !== undefined && low !== undefined ? high - low : 0;
        });
        const ema1 = this.calculateEMA(ranges, length);
        const ema2 = this.calculateEMA(ema1, length);
        const ratio = ArrayUtils.processArray(ema1, (val1, i) => {
            const val2 = ema2[i];
            if (val1 === undefined || val2 === undefined || val2 === 0) {
                return 0;
            }
            return val1 / val2;
        });
        return ArrayUtils.processArray(ratio, (_, i) => {
            if (i < length * 2 - 1) {
                return NaN;
            }
            const sum = ArrayUtils.processWindow(ratio, length, (window) => {
                return calculateWindowSum(window);
            });
            return sum[i] || 0;
        });
    }
    calculateEMA(data, length) {
        return movingAverage(data, length, 'ema');
    }
}
/**
 * Calculate Mass Index values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 9)
 * @returns Mass Index values array
 */
export function massIndex(data, length) {
    return createIndicatorWrapper(MassIndex, data, length);
}
