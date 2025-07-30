import { createPivotIndicator } from '@core/factories/indicator-factory';
import { calculateWoodiePivots } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Woodie Pivots Indicator
 *
 * Calculates support and resistance levels based on the previous day's high, low, and close.
 * Uses a modified pivot point formula that gives more weight to the close price.
 *
 * @example
 * ```typescript
 * const woodie = new WoodiePivots()
 * const result = woodie.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // R1 resistance levels
 * console.log(result.metadata.s1) // S1 support levels
 * ```
 */
export const WoodiePivots = createPivotIndicator('WoodiePivots', 'Woodie Pivot Points', calculateWoodiePivots);
/**
 * Calculate Woodie Pivots using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @returns Woodie pivot levels
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
