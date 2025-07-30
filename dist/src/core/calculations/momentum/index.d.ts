export declare function calculateMomentum(data: number[], length: number, type?: 'momentum' | 'roc'): number[];
/**
 * Calculate momentum (current price - price n periods ago)
 *
 * Uses centralized calculation utilities for consistency.
 * Pine Script equivalent: momentum(src, length)
 *
 * @param data - Source data array
 * @param length - Number of periods to look back
 * @returns Array of momentum values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const momentum = momentum(prices, 2)
 * console.log(momentum) // [1, 1, 1, 1]
 * ```
 */
export declare function momentum(data: number[], length: number): number[];
/**
 * Calculate Rate of Change (ROC)
 *
 * Uses centralized calculation utilities for consistency.
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
 * const roc = roc(prices, 2)
 * console.log(roc) // [2, 1.98, 1.96, 1.94]
 * ```
 */
export declare function roc(data: number[], length: number): number[];
//# sourceMappingURL=index.d.ts.map