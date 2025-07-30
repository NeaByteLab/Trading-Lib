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
export declare function standardDeviation(data: number[], length: number): number[];
//# sourceMappingURL=standard-deviation.d.ts.map