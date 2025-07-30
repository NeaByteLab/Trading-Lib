import { calculateRollingStatistic } from '@utils/calculation-utils';
/**
 * Calculate rolling standard deviation
 *
 * Uses centralized calculation utilities to ensure consistency and eliminate duplication.
 * Pine Script equivalent: stdev(src, length)
 *
 * @param data - Source data array
 * @param length - Window length for calculation
 * @returns Array of standard deviation values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const stdDev = standardDeviation(prices, 3)
 * console.log(stdDev) // Standard deviation values
 * ```
 */
export function standardDeviation(data, length) {
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
    }
    if (length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    // Use centralized rolling statistic calculation
    const variance = calculateRollingStatistic(data, length, 'variance');
    // Convert variance to standard deviation
    return variance.map(val => isNaN(val) ? NaN : Math.sqrt(val));
}
//# sourceMappingURL=standard-deviation.js.map