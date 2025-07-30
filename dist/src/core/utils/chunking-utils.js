/**
 * Optimized chunking utilities for handling big datasets
 *
 * Provides efficient data processing strategies for large OHLC datasets.
 * Implements memory-efficient chunking, streaming, and parallel processing.
 *
 * @example
 * ```typescript
 * import { ChunkingUtils } from '@utils/chunking-utils'
 *
 * const chunks = ChunkingUtils.createChunks(largeDataset, 10000)
 * const results = ChunkingUtils.processChunks(chunks, calculateRSI)
 * ```
 */
import { ERROR_MESSAGES } from '@constants/indicator-constants';
/**
 * Default chunk configuration for large datasets
 */
export const DEFAULT_CHUNK_CONFIG = {
    chunkSize: 10000,
    overlap: 100,
    streaming: true,
    memoryLimit: 100,
    parallel: false
};
/**
 * Optimized chunking utilities for big datasets
 */
export const ChunkingUtils = {
    /**
     * Create optimized chunks for large datasets
     *
     * @param data - Input data array
     * @param config - Chunk configuration
     * @returns Array of data chunks
     */
    createChunks(data, config = {}) {
        const finalConfig = { ...DEFAULT_CHUNK_CONFIG, ...config };
        const { chunkSize, overlap } = finalConfig;
        if (data.length <= chunkSize) {
            return [data];
        }
        const chunks = [];
        let startIndex = 0;
        while (startIndex < data.length) {
            const endIndex = Math.min(startIndex + chunkSize, data.length);
            const chunk = data.slice(startIndex, endIndex);
            chunks.push(chunk);
            startIndex = endIndex - overlap;
            if (startIndex >= data.length) {
                break;
            }
        }
        return chunks;
    },
    /**
     * Process chunks with streaming for memory efficiency
     *
     * @param data - Input data array
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Processed results
     */
    processChunks(data, processor, config = {}) {
        const finalConfig = { ...DEFAULT_CHUNK_CONFIG, ...config };
        const chunks = this.createChunks(data, finalConfig);
        const results = [];
        for (let i = 0; i < chunks.length; i++) {
            const chunkResults = processor(chunks[i], i);
            results.push(...chunkResults);
        }
        return results;
    },
    /**
     * Process chunks with overlap for continuity
     *
     * @param data - Input data array
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Processed results
     */
    processChunksWithOverlap(data, processor, config = {}) {
        const finalConfig = { ...DEFAULT_CHUNK_CONFIG, ...config };
        const { chunkSize, overlap } = finalConfig;
        if (data.length <= chunkSize) {
            return processor(data, 0);
        }
        const results = [];
        let startIndex = 0;
        while (startIndex < data.length) {
            const endIndex = Math.min(startIndex + chunkSize, data.length);
            const chunk = data.slice(startIndex, endIndex);
            const chunkResults = processor(chunk, results.length);
            results.push(...chunkResults);
            startIndex = endIndex - overlap;
            if (startIndex >= data.length) {
                break;
            }
        }
        return results;
    },
    /**
     * Stream process chunks for memory efficiency
     *
     * @param data - Input data array
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Generator yielding processed chunks
     */
    *streamProcess(data, processor, config = {}) {
        const finalConfig = { ...DEFAULT_CHUNK_CONFIG, ...config };
        const chunks = this.createChunks(data, finalConfig);
        for (let i = 0; i < chunks.length; i++) {
            const chunkResults = processor(chunks[i], i);
            yield chunkResults;
        }
    },
    /**
     * Process large windows with chunking
     *
     * @param data - Input data array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Processed results
     */
    processLargeWindows(data, windowSize, processor, config = {}) {
        const finalConfig = { ...DEFAULT_CHUNK_CONFIG, ...config };
        const { chunkSize } = finalConfig;
        if (data.length <= chunkSize) {
            const results = [];
            for (let i = windowSize - 1; i < data.length; i++) {
                const window = data.slice(i - windowSize + 1, i + 1);
                results.push(processor(window, i));
            }
            return results;
        }
        return this.processChunksWithOverlap(data, (chunk, chunkIndex) => {
            const results = [];
            const globalStartIndex = chunkIndex * (chunkSize - finalConfig.overlap);
            for (let i = windowSize - 1; i < chunk.length; i++) {
                const window = chunk.slice(i - windowSize + 1, i + 1);
                const globalIndex = globalStartIndex + i;
                results.push(processor(window, globalIndex));
            }
            return results;
        }, finalConfig);
    },
    /**
     * Get current memory usage in MB
     *
     * @returns Memory usage in MB
     */
    getMemoryUsage() {
        try {
            const performance = globalThis?.performance;
            if (performance?.memory?.usedJSHeapSize) {
                return performance.memory.usedJSHeapSize / 1024 / 1024;
            }
        }
        catch {
            // Ignore errors in environments without performance API
        }
        return 0;
    },
    /**
     * Optimize chunk size based on data characteristics
     *
     * @param dataLength - Length of dataset
     * @param memoryLimit - Memory limit in MB
     * @returns Optimized chunk configuration
     */
    optimizeChunkConfig(dataLength, memoryLimit = 100) {
        const memoryUsage = this.getMemoryUsage();
        const availableMemory = memoryLimit - memoryUsage;
        const memoryPerPoint = 8;
        const maxChunkSize = Math.floor(availableMemory * 1024 * 1024 / memoryPerPoint);
        const optimalChunkSize = Math.min(Math.max(1000, maxChunkSize), Math.min(50000, dataLength));
        return {
            chunkSize: optimalChunkSize,
            overlap: Math.floor(optimalChunkSize * 0.01),
            streaming: true,
            memoryLimit,
            parallel: false
        };
    },
    /**
     * Validate chunk configuration
     *
     * @param config - Chunk configuration
     * @throws {Error} If configuration is invalid
     */
    validateChunkConfig(config) {
        if (config.chunkSize <= 0) {
            throw new Error('Chunk size must be positive');
        }
        if (config.overlap < 0) {
            throw new Error('Overlap must be non-negative');
        }
        if (config.overlap >= config.chunkSize) {
            throw new Error('Overlap must be less than chunk size');
        }
        if (config.memoryLimit <= 0) {
            throw new Error('Memory limit must be positive');
        }
    },
    /**
     * Process data with automatic chunk optimization
     *
     * @param data - Input data array
     * @param processor - Processing function
     * @param memoryLimit - Memory limit in MB
     * @returns Processed results
     */
    autoProcess(data, processor, memoryLimit = 100) {
        const config = this.optimizeChunkConfig(data.length, memoryLimit);
        this.validateChunkConfig(config);
        return this.processChunksWithOverlap(data, processor, config);
    }
};
/**
 * Specialized chunking for OHLC data
 */
export const OHLCChunkingUtils = {
    /**
     * Create chunks optimized for OHLC data processing
     *
     * @param data - OHLC market data
     * @param config - Chunk configuration
     * @returns Array of OHLC chunks
     */
    createOHLCChunks(data, config = {}) {
        const { high, low, close } = data;
        const { length } = high;
        if (length === 0) {
            throw new Error(ERROR_MESSAGES.EMPTY_DATA);
        }
        const finalConfig = { ...DEFAULT_CHUNK_CONFIG, ...config };
        const { chunkSize, overlap } = finalConfig;
        if (length <= chunkSize) {
            return [data];
        }
        const chunks = [];
        let startIndex = 0;
        while (startIndex < length) {
            const endIndex = Math.min(startIndex + chunkSize, length);
            const chunk = {
                high: high.slice(startIndex, endIndex),
                low: low.slice(startIndex, endIndex),
                close: close.slice(startIndex, endIndex)
            };
            if (data.open) {
                chunk.open = data.open.slice(startIndex, endIndex);
            }
            if (data.volume) {
                chunk.volume = data.volume.slice(startIndex, endIndex);
            }
            chunks.push(chunk);
            startIndex = endIndex - overlap;
            if (startIndex >= length) {
                break;
            }
        }
        return chunks;
    },
    /**
     * Process OHLC data with optimized chunking
     *
     * @param data - OHLC market data
     * @param processor - Processing function
     * @param config - Chunk configuration
     * @returns Processed results
     */
    processOHLCChunks(data, processor, config = {}) {
        const chunks = this.createOHLCChunks(data, config);
        const results = [];
        for (let i = 0; i < chunks.length; i++) {
            const chunkResults = processor(chunks[i], i);
            results.push(...chunkResults);
        }
        return results;
    }
};
