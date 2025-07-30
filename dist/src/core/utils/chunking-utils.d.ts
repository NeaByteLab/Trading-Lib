/**
 * Chunk configuration for optimal performance
 */
export interface ChunkConfig {
    /** Chunk size in elements */
    chunkSize: number;
    /** Overlap between chunks for continuity */
    overlap: number;
    /** Whether to use streaming processing */
    streaming: boolean;
    /** Memory limit in MB */
    memoryLimit: number;
    /** Whether to enable parallel processing */
    parallel: boolean;
}
/**
 * Default chunk configuration for large datasets
 */
export declare const DEFAULT_CHUNK_CONFIG: ChunkConfig;
/**
 * Chunk result with metadata
 */
export interface ChunkResult<T> {
    data: T[];
    startIndex: number;
    endIndex: number;
    chunkIndex: number;
    metadata: {
        processingTime: number;
        memoryUsage: number;
        dataPoints: number;
    };
}
/**
 * Optimized chunking utilities for big datasets
 */
export declare const ChunkingUtils: {
    /**
     * Create optimized chunks for large datasets
     *
     * @param data - Input data array
     * @param config - Chunk configuration
     * @returns Array of data chunks
     */
    createChunks<T>(data: T[], config?: Partial<ChunkConfig>): T[][];
    /**
     * Process chunks with streaming for memory efficiency
     *
     * @param data - Input data array
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Processed results
     */
    processChunks<T, R>(data: T[], processor: (chunk: T[], chunkIndex: number) => R[], config?: Partial<ChunkConfig>): R[];
    /**
     * Process chunks with overlap for continuity
     *
     * @param data - Input data array
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Processed results
     */
    processChunksWithOverlap<T, R>(data: T[], processor: (chunk: T[], chunkIndex: number) => R[], config?: Partial<ChunkConfig>): R[];
    /**
     * Stream process chunks for memory efficiency
     *
     * @param data - Input data array
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Generator yielding processed chunks
     */
    streamProcess<T, R>(data: T[], processor: (chunk: T[], chunkIndex: number) => R[], config?: Partial<ChunkConfig>): Generator<R[], void, unknown>;
    /**
     * Process large windows with chunking
     *
     * @param data - Input data array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Processed results
     */
    processLargeWindows<T, R>(data: T[], windowSize: number, processor: (window: T[], index: number) => R, config?: Partial<ChunkConfig>): R[];
    /**
     * Get current memory usage in MB
     *
     * @returns Memory usage in MB
     */
    getMemoryUsage(): number;
    /**
     * Optimize chunk size based on data characteristics
     *
     * @param dataLength - Length of dataset
     * @param memoryLimit - Memory limit in MB
     * @returns Optimized chunk configuration
     */
    optimizeChunkConfig(dataLength: number, memoryLimit?: number): ChunkConfig;
    /**
     * Validate chunk configuration
     *
     * @param config - Chunk configuration
     * @throws {Error} If configuration is invalid
     */
    validateChunkConfig(config: ChunkConfig): void;
    /**
     * Process data with automatic chunk optimization
     *
     * @param data - Input data array
     * @param processor - Processing function
     * @param memoryLimit - Memory limit in MB
     * @returns Processed results
     */
    autoProcess<T, R>(data: T[], processor: (chunk: T[], chunkIndex: number) => R[], memoryLimit?: number): R[];
};
/**
 * Specialized chunking for OHLC data
 */
export declare const OHLCChunkingUtils: {
    /**
     * Create chunks optimized for OHLC data processing
     *
     * @param data - OHLC market data
     * @param config - Chunk configuration
     * @returns Array of OHLC chunks
     */
    createOHLCChunks(data: {
        open?: number[];
        high: number[];
        low: number[];
        close: number[];
        volume?: number[];
    }, config?: Partial<ChunkConfig>): Array<{
        open?: number[];
        high: number[];
        low: number[];
        close: number[];
        volume?: number[];
    }>;
    /**
     * Process OHLC data with optimized chunking
     *
     * @param data - OHLC market data
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Processed results
     */
    processOHLCChunks<T>(data: {
        open?: number[];
        high: number[];
        low: number[];
        close: number[];
        volume?: number[];
    }, processor: (chunk: {
        open?: number[];
        high: number[];
        low: number[];
        close: number[];
        volume?: number[];
    }, chunkIndex: number) => T[], config?: Partial<ChunkConfig>): T[];
};
//# sourceMappingURL=chunking-utils.d.ts.map