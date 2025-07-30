/**
 * Unified momentum calculation function to eliminate duplication
 *
 * Provides momentum and ROC calculations using centralized utilities.
 * Pine Script equivalent: momentum(src, length) and roc(src, length)
 *
 * @param data - Source data array
 * @param length - Window length for calculation
 * @param type - Calculation type ('momentum' or 'roc')
 * @returns Array of momentum or ROC values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const momentum = calculateMomentum(prices, 2, 'momentum')
 * const roc = calculateMomentum(prices, 2, 'roc')
 * ```
 */
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
 * console.log(roc) // [1, 0.99, 0.98, 0.97]
 * ```
 */
export declare function roc(data: number[], length: number): number[];
//# sourceMappingURL=index.d.ts.map