/**
 * Centralized array processing utilities
 * Eliminates duplication across all indicators
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
     * Process array with sliding window
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @returns Processed array
     */
    processWindow<T, R>(data: T[], windowSize: number, processor: (window: T[], index: number) => R): R[];
    /**
     * Optimized window processing for large datasets
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @param chunkSize - Chunk size for large datasets
     * @returns Processed array
     */
    processLargeWindow<T, R>(data: T[], windowSize: number, processor: (window: T[], index: number) => R, chunkSize?: number): R[];
    /**
     * Calculate rolling statistic
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param statistic - Statistic type
     * @returns Array of rolling statistics
     */
    rollingStatistic(data: number[], windowSize: number, statistic: "min" | "max" | "mean" | "sum"): number[];
    /**
     * Optimized rolling statistic for large datasets
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param statistic - Statistic type
     * @param chunkSize - Chunk size for large datasets
     * @returns Array of rolling statistics
     */
    rollingStatisticLarge(data: number[], windowSize: number, statistic: "min" | "max" | "mean" | "sum", chunkSize?: number): number[];
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
    /**
     * Centralized window processing with validation
     * Eliminates duplication in array processing patterns
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @returns Processed array
     */
    processValidWindow<T, R>(data: T[], windowSize: number, processor: (validWindow: T[]) => R): (R | number)[];
    /**
     * Optimized window processing for large datasets
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @param chunkSize - Chunk size for large datasets
     * @returns Processed array
     */
    processValidWindowLarge<T, R>(data: T[], windowSize: number, processor: (validWindow: T[]) => R, chunkSize?: number): (R | number)[];
    /**
     * Centralized array validation and processing
     * Eliminates duplication in validation patterns
     *
     * @param data - Input array
     * @param processor - Processing function
     * @param minLength - Minimum required length
     * @returns Processed array
     */
    processValidArray<T, R>(data: T[], processor: (validData: T[]) => R, minLength?: number): R | number;
    /**
     * Memory-efficient streaming processor for large datasets
     *
     * @param data - Input array
     * @param processor - Processing function
     * @param chunkSize - Chunk size
     * @returns Generator for streaming results
     */
    streamProcess<T, R>(data: T[], processor: (chunk: T[]) => R[], chunkSize?: number): Generator<R[], void, unknown>;
    /**
     * Optimized array processing with memory management
     *
     * @param data - Input array
     * @param processor - Processing function
     * @param chunkSize - Chunk size for large datasets
     * @returns Processed array
     */
    processWithChunking<T, R>(data: T[], processor: (chunk: T[]) => R[], chunkSize?: number): R[];
};
//# sourceMappingURL=array-utils.d.ts.map