import { createPivotIndicator } from '@core/factories/indicator-factory';
import { calculateCamarillaPivots } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Camarilla Pivots Indicator
 *
 * Calculates support and resistance levels based on the previous day's high, low, and close.
 * These levels are used for intraday trading and provide potential reversal points.
 *
 * @example
 * ```typescript
 * const camarilla = new CamarillaPivots()
 * const result = camarilla.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // R1 resistance levels
 * console.log(result.metadata.s1) // S1 support levels
 * ```
 */
export const CamarillaPivots = createPivotIndicator('CamarillaPivots', 'Camarilla Pivot Points', calculateCamarillaPivots);
/**
 * Calculate Camarilla Pivots using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @returns Camarilla pivot levels
 */
export function camarilla(data) {
    const result = createMultiResultIndicatorWrapper(CamarillaPivots, data);
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
