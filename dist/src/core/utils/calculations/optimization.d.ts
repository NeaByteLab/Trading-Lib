/**
 * Optimized calculation utilities for large datasets
 */
export declare const LargeDatasetCalculations: {
    /**
     * Calculate RSI with chunking for large datasets
     *
     * @param data - Price data array
     * @param length - RSI period
     * @param chunkSize - Chunk size for large datasets
     * @returns RSI values array
     */
    calculateRSIChunked(data: number[], length: number, chunkSize?: number): number[];
    /**
     * Calculate moving average with chunking for large datasets
     *
     * @param data - Price data array
     * @param length - Moving average period
     * @param type - Moving average type
     * @param chunkSize - Chunk size for large datasets
     * @returns Moving average values array
     */
    calculateMAChunked(data: number[], length: number, type: "sma" | "ema" | "wma" | "hull", chunkSize?: number): number[];
    /**
     * Calculate rolling statistics with chunking for large datasets
     *
     * @param data - Price data array
     * @param windowSize - Window size
     * @param statistic - Statistic type
     * @param chunkSize - Chunk size for large datasets
     * @returns Rolling statistics array
     */
    calculateRollingStatisticChunked(data: number[], windowSize: number, statistic: "mean" | "min" | "max" | "sum", chunkSize?: number): number[];
    /**
     * Calculate true range with chunking for large datasets
     *
     * @param high - High prices array
     * @param low - Low prices array
     * @param close - Close prices array
     * @param chunkSize - Chunk size for large datasets
     * @returns True range values array
     */
    calculateTrueRangeChunked(high: number[], low: number[], close: number[], chunkSize?: number): number[];
    /**
     * Calculate pivot points with chunking for large datasets
     *
     * @param high - High prices array
     * @param low - Low prices array
     * @param close - Close prices array
     * @param chunkSize - Chunk size for large datasets
     * @returns Pivot points object
     */
    calculatePivotPointsChunked(high: number[], low: number[], close: number[], chunkSize?: number): {
        pp: number[];
        r1: number[];
        r2: number[];
        r3: number[];
        s1: number[];
        s2: number[];
        s3: number[];
    };
};
/**
 * Vectorized array processing with SIMD-friendly operations
 * Optimized for modern CPU architectures
 *
 * @param data - Input data array
 * @param operation - Vectorized operation function
 * @returns Processed array
 */
export declare function vectorizedProcess<T>(data: number[], operation: (val: number, index: number) => T): T[];
/**
 * Optimized window processing with improved memory access patterns
 * Reduces cache misses and improves vectorization opportunities
 *
 * @param data - Input data array
 * @param windowSize - Window size
 * @param operation - Window operation function
 * @returns Processed array
 */
export declare function optimizedWindowProcess<T>(data: number[], windowSize: number, operation: (window: number[], startIndex: number) => T): T[];
//# sourceMappingURL=optimization.d.ts.map