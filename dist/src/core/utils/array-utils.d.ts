/**
 * Centralized array processing utilities
 *
 * Provides common array operations to eliminate code duplication.
 * All indicators should use these utilities instead of manual implementations.
 *
 * @example
 * ```typescript
 * import { ArrayUtils } from '@utils/array-utils'
 *
 * const result = ArrayUtils.processArray(data, (val, i) => val * 2)
 * ```
 */
export declare const ArrayUtils: {
    /**
     * Process array with custom function
     *
     * @param data - Input array
     * @param processor - Processing function
     * @returns Processed array
     */
    processArray<T, R>(data: T[], processor: (value: T, index: number) => R): R[];
    /**
     * Process array with window-based calculation
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Window processing function
     * @returns Processed array
     */
    processWindow<T, R>(data: T[], windowSize: number, processor: (window: T[], index: number) => R): R[];
    /**
     * Calculate rolling statistics
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param statistic - Statistic type
     * @returns Array of statistics
     */
    rollingStatistic(data: number[], windowSize: number, statistic: "min" | "max" | "mean" | "sum"): number[];
    /**
     * Calculate percentage change
     *
     * @param data - Input array
     * @param period - Lookback period
     * @returns Array of percentage changes
     */
    percentChange(data: number[], period?: number): number[];
    /**
     * Calculate momentum (price change)
     *
     * @param data - Input array
     * @param period - Lookback period
     * @returns Array of momentum values
     */
    momentum(data: number[], period?: number): number[];
    /**
     * Validate array data
     *
     * @param data - Input array
     * @param minLength - Minimum required length
     * @throws {Error} If validation fails
     */
    validateArray(data: number[], minLength?: number): void;
    /**
     * Fill array with NaN values
     *
     * @param length - Array length
     * @param offset - Offset for NaN values
     * @returns Array filled with NaN values
     */
    fillNaN(length: number, offset?: number): number[];
    /**
     * Shift array by specified amount
     *
     * @param data - Source array
     * @param offset - Shift amount (positive = forward, negative = backward)
     * @returns Shifted array
     */
    shift(data: number[], offset: number): number[];
    /**
     * Get window slice for rolling calculations
     *
     * @param data - Source array
     * @param currentIndex - Current index
     * @param windowSize - Window size
     * @returns Window slice
     */
    getWindowSlice<T>(data: T[], currentIndex: number, windowSize: number): T[];
};
//# sourceMappingURL=array-utils.d.ts.map