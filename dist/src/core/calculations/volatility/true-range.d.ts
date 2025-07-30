/**
 * Calculate True Range (TR)
 *
 * True Range is the greatest of the following:
 * 1. Current High - Current Low
 * 2. |Current High - Previous Close|
 * 3. |Current Low - Previous Close|
 *
 * @param data - Market data with high, low, close arrays
 * @returns Array of True Range values
 */
export declare function trueRange(data: {
    high: number[];
    low: number[];
    close: number[];
}): number[];
//# sourceMappingURL=true-range.d.ts.map