/**
 * Calculate standard pivot points using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Pivot point levels
 * @throws {Error} If data is empty or arrays have different lengths
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
 * Calculate Camarilla pivot points using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Camarilla pivot levels
 * @throws {Error} If data is empty or arrays have different lengths
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