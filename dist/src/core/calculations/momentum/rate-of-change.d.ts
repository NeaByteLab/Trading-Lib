/**
 * Calculate Rate of Change (ROC)
 *
 * Uses centralized calculation utilities to eliminate code duplication.
 * Pine Script equivalent: roc(src, length)
 *
 * @param data - Source data array
 * @param length - Number of periods to look back
 * @returns Array of ROC values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const roc = rateOfChange(prices, 2)
 * console.log(roc) // [2, 1.98, 1.96, 1.94]
 * ```
 */
export declare function rateOfChange(data: number[], length: number): number[];
//# sourceMappingURL=rate-of-change.d.ts.map