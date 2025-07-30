import { calculateVariance } from '@utils/calculation-utils';
/**
 * Calculate rolling variance
 *
 * Uses centralized calculation utilities to ensure consistency and eliminate duplication.
 * Pine Script equivalent: variance(src, length)
 *
 * @param data - Source data array
 * @param length - Window length for calculation
 * @returns Array of variance values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const variance = variance(prices, 3)
 * console.log(variance) // Variance values
 * ```
 */
export function variance(data, length) {
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
    }
    if (length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    return [calculateVariance(data)];
}
