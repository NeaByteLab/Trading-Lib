import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Calculate Woodie Pivot Points
 *
 * @param data - Market data with OHLC
 * @returns Woodie pivot points
 */
function calculateWoodiePivots(data) {
    const result = {
        pp: [],
        r1: [],
        r2: [],
        r3: [],
        s1: [],
        s2: [],
        s3: []
    };
    return ArrayUtils.processArray(data.high, (_, i) => {
        const high = data.high[i];
        const low = data.low[i];
        const close = data.close[i];
        if (isNaN(high) || isNaN(low) || isNaN(close)) {
            return {
                pp: NaN,
                r1: NaN,
                r2: NaN,
                r3: NaN,
                s1: NaN,
                s2: NaN,
                s3: NaN
            };
        }
        // Woodie's pivot point formula: PP = (H + L + 2C) / 4
        const pp = (high + low + (2 * close)) / 4;
        const range = high - low;
        // Woodie's support and resistance levels
        const r1 = (2 * pp) - low;
        const r2 = pp + range;
        const r3 = high + 2 * (pp - low);
        const s1 = (2 * pp) - high;
        const s2 = pp - range;
        const s3 = low - 2 * (high - pp);
        return {
            pp,
            r1,
            r2,
            r3,
            s1,
            s2,
            s3
        };
    }).reduce((acc, curr) => {
        acc.pp.push(curr.pp);
        acc.r1.push(curr.r1);
        acc.r2.push(curr.r2);
        acc.r3.push(curr.r3);
        acc.s1.push(curr.s1);
        acc.s2.push(curr.s2);
        acc.s3.push(curr.s3);
        return acc;
    }, result);
}
/**
 * Woodie Pivot Points indicator
 *
 * Calculates Woodie pivot points and support/resistance levels.
 * Formula: PP = (H + L + 2C) / 4, R1 = (2 × PP) - L, S1 = (2 × PP) - H
 *
 * @example
 * ```typescript
 * const woodie = new WoodiePivots()
 * const result = woodie.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // Resistance 1 values
 * console.log(result.metadata.s1) // Support 1 values
 * ```
 */
export class WoodiePivots extends BaseIndicator {
    constructor() {
        super('WoodiePivots', 'Woodie Pivot Points', 'trend');
    }
    validateInput(data, _config) {
        if (!data) {
            throw new Error(ERROR_MESSAGES.NULL_UNDEFINED_DATA);
        }
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        if (!data.high || !data.low || !data.close) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        const { pp, r1, r2, r3, s1, s2, s3 } = calculateWoodiePivots(data);
        return {
            values: pp,
            metadata: {
                length: 1,
                source: 'close',
                r1,
                r2,
                r3,
                s1,
                s2,
                s3
            }
        };
    }
}
/**
 * Calculate Woodie Pivot Points using wrapper function
 *
 * @param data - Market data with OHLC
 * @returns Woodie pivot points with support and resistance levels
 */
export function woodie(data) {
    const result = createMultiResultIndicatorWrapper(WoodiePivots, data);
    return {
        pp: result.values,
        r1: result.metadata['r1'],
        r2: result.metadata['r2'],
        r3: result.metadata['r3'],
        s1: result.metadata['s1'],
        s2: result.metadata['s2'],
        s3: result.metadata['s3']
    };
}
