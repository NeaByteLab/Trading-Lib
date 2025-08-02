/**
 * Standard Pivot Points - support and resistance levels based on previous period
 * Formula: PP = (High + Low + Close) / 3, R1 = 2×PP - Low, S1 = 2×PP - High
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Pivot point levels
 * @throws {Error} If data is empty or arrays have different lengths
 *
 * @example
 * ```typescript
 * const pivots = calculatePivotPoints(data.high, data.low, data.close)
 * // Returns: { pp: [...], r1: [...], r2: [...], r3: [...], s1: [...], s2: [...], s3: [...] }
 * ```
 */
export declare function calculatePivotPoints(high: number[], low: number[], close: number[]): {
    pp: number[];
    r1: number[];
    r2: number[];
    r3: number[];
    s1: number[];
    s2: number[];
    s3: number[];
};
/**
 * Camarilla Pivot Points - intraday support and resistance levels
 * Formula: PP = (High + Low + Close) / 3, R1 = Close + (High - Low) × 1.1/12
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Camarilla pivot levels
 * @throws {Error} If data is empty or arrays have different lengths
 *
 * @example
 * ```typescript
 * const camarilla = calculateCamarillaPivots(data.high, data.low, data.close)
 * // Returns: { pp: [...], r1: [...], r2: [...], r3: [...], s1: [...], s2: [...], s3: [...] }
 * ```
 */
export declare function calculateCamarillaPivots(high: number[], low: number[], close: number[]): {
    pp: number[];
    r1: number[];
    r2: number[];
    r3: number[];
    s1: number[];
    s2: number[];
    s3: number[];
};
/**
 * Calculate Woodie pivot points using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Woodie pivot levels
 * @throws {Error} If data is empty or arrays have different lengths
 */
export declare function calculateWoodiePivots(high: number[], low: number[], close: number[]): {
    pp: number[];
    r1: number[];
    r2: number[];
    r3: number[];
    s1: number[];
    s2: number[];
    s3: number[];
};
//# sourceMappingURL=pivot-points.d.ts.map