/**
 * Calculate Relative Moving Average (RMA)
 *
 * RMA is Pine Script's default smoothing method and is equivalent to Wilder's smoothing.
 * Formula: RMA = (prevRMA * (length - 1) + currentValue) / length
 *
 * @param data - Source data array
 * @param length - RMA period
 * @returns Array of RMA values
 * @throws {Error} If data is empty or length is invalid
 *
 * @example
 * ```typescript
 * const data = [100, 102, 104, 103, 105, 107, 106, 108, 110, 112]
 * const rma = calculateRMA(data, 5)
 * console.log(rma) // RMA values
 * ```
 */
export declare function calculateRMA(data: number[], length: number): number[];
//# sourceMappingURL=rma.d.ts.map