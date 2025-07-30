import { movingAverage } from '@calculations/moving-averages';
import { ArrayUtils } from '@core/utils/array-utils';
import { calculateRSI } from '@core/utils/calculations/oscillators';
/**
 * Optimized calculation utilities for large datasets
 */
export const LargeDatasetCalculations = {
    /**
     * Calculate RSI with chunking for large datasets
     *
     * @param data - Price data array
     * @param length - RSI period
     * @param chunkSize - Chunk size for large datasets
     * @returns RSI values array
     */
    calculateRSIChunked(data, length, chunkSize = 10000) {
        if (data.length <= chunkSize) {
            return calculateRSI(data, length);
        }
        return ArrayUtils.processWithChunking(data, (chunk) => {
            return calculateRSI(chunk, length);
        }, chunkSize);
    },
    /**
     * Calculate moving average with chunking for large datasets
     *
     * @param data - Price data array
     * @param length - Moving average period
     * @param type - Moving average type
     * @param chunkSize - Chunk size for large datasets
     * @returns Moving average values array
     */
    calculateMAChunked(data, length, type, chunkSize = 10000) {
        if (data.length <= chunkSize) {
            return movingAverage(data, length, type);
        }
        return ArrayUtils.processWithChunking(data, (chunk) => {
            return movingAverage(chunk, length, type);
        }, chunkSize);
    },
    /**
     * Calculate rolling statistics with chunking for large datasets
     *
     * @param data - Price data array
     * @param windowSize - Window size
     * @param statistic - Statistic type
     * @param chunkSize - Chunk size for large datasets
     * @returns Rolling statistics array
     */
    calculateRollingStatisticChunked(data, windowSize, statistic, chunkSize = 10000) {
        return ArrayUtils.rollingStatisticLarge(data, windowSize, statistic, chunkSize);
    },
    /**
     * Calculate true range with chunking for large datasets
     *
     * @param high - High prices array
     * @param low - Low prices array
     * @param close - Close prices array
     * @param chunkSize - Chunk size for large datasets
     * @returns True range values array
     */
    calculateTrueRangeChunked(high, low, close, chunkSize = 10000) {
        if (high.length <= chunkSize) {
            return calculateTrueRange(high, low, close);
        }
        const result = [];
        for (let i = 0; i < high.length; i += chunkSize) {
            const endIndex = Math.min(i + chunkSize, high.length);
            const highChunk = high.slice(i, endIndex);
            const lowChunk = low.slice(i, endIndex);
            const closeChunk = close.slice(i, endIndex);
            const chunkResult = calculateTrueRange(highChunk, lowChunk, closeChunk);
            result.push(...chunkResult);
        }
        return result;
    },
    /**
     * Calculate pivot points with chunking for large datasets
     *
     * @param high - High prices array
     * @param low - Low prices array
     * @param close - Close prices array
     * @param chunkSize - Chunk size for large datasets
     * @returns Pivot points object
     */
    calculatePivotPointsChunked(high, low, close, chunkSize = 10000) {
        if (high.length <= chunkSize) {
            return calculatePivotPoints(high, low, close);
        }
        const pp = [];
        const r1 = [];
        const r2 = [];
        const r3 = [];
        const s1 = [];
        const s2 = [];
        const s3 = [];
        for (let i = 0; i < high.length; i += chunkSize) {
            const endIndex = Math.min(i + chunkSize, high.length);
            const highChunk = high.slice(i, endIndex);
            const lowChunk = low.slice(i, endIndex);
            const closeChunk = close.slice(i, endIndex);
            const chunkResult = calculatePivotPoints(highChunk, lowChunk, closeChunk);
            pp.push(...chunkResult.pp);
            r1.push(...chunkResult.r1);
            r2.push(...chunkResult.r2);
            r3.push(...chunkResult.r3);
            s1.push(...chunkResult.s1);
            s2.push(...chunkResult.s2);
            s3.push(...chunkResult.s3);
        }
        return { pp, r1, r2, r3, s1, s2, s3 };
    }
};
/**
 * Vectorized array processing with SIMD-friendly operations
 * Optimized for modern CPU architectures
 *
 * @param data - Input data array
 * @param operation - Vectorized operation function
 * @returns Processed array
 */
export function vectorizedProcess(data, operation) {
    const result = new Array(data.length);
    const blockSize = 64;
    for (let i = 0; i < data.length; i += blockSize) {
        const end = Math.min(i + blockSize, data.length);
        for (let j = i; j < end; j++) {
            const val = data[j];
            if (val !== undefined) {
                result[j] = operation(val, j);
            }
        }
    }
    return result;
}
/**
 * Optimized window processing with improved memory access patterns
 * Reduces cache misses and improves vectorization opportunities
 *
 * @param data - Input data array
 * @param windowSize - Window size
 * @param operation - Window operation function
 * @returns Processed array
 */
export function optimizedWindowProcess(data, windowSize, operation) {
    const result = [];
    const blockSize = Math.min(windowSize * 2, 128);
    for (let i = 0; i < data.length; i++) {
        if (i < windowSize - 1) {
            result.push(operation([], i));
            continue;
        }
        const window = [];
        const start = Math.max(0, i - windowSize + 1);
        const end = i + 1;
        for (let j = start; j < end; j += blockSize) {
            const blockEnd = Math.min(j + blockSize, end);
            for (let k = j; k < blockEnd; k++) {
                const val = data[k];
                if (val !== undefined && isFinite(val)) {
                    window.push(val);
                }
            }
        }
        result.push(operation(window, i));
    }
    return result;
}
/**
 * Calculate true range for optimization module
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns True range values array
 */
function calculateTrueRange(high, low, close) {
    return ArrayUtils.processArray(close, (_currentClose, i) => {
        if (i === 0) {
            return NaN;
        }
        const currentHigh = high[i];
        const currentLow = low[i];
        const previousClose = close[i - 1];
        return Math.max(currentHigh - currentLow, Math.abs(currentHigh - previousClose), Math.abs(currentLow - previousClose));
    });
}
/**
 * Calculate pivot points for optimization module
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Pivot points object
 */
function calculatePivotPoints(high, low, close) {
    const pp = ArrayUtils.processArray(high, (highVal, i) => {
        const lowVal = low[i];
        const closeVal = close[i];
        if (isNaN(highVal) || isNaN(lowVal) || isNaN(closeVal)) {
            return NaN;
        }
        return (highVal + lowVal + closeVal) / 3;
    });
    const r1 = ArrayUtils.processArray(pp, (pivot, i) => {
        if (isNaN(pivot)) {
            return NaN;
        }
        return 2 * pivot - low[i];
    });
    const s1 = ArrayUtils.processArray(pp, (pivot, i) => {
        if (isNaN(pivot)) {
            return NaN;
        }
        return 2 * pivot - high[i];
    });
    const r2 = ArrayUtils.processArray(pp, (pivot, i) => {
        if (isNaN(pivot)) {
            return NaN;
        }
        return pivot + (high[i] - low[i]);
    });
    const s2 = ArrayUtils.processArray(pp, (pivot, i) => {
        if (isNaN(pivot)) {
            return NaN;
        }
        return pivot - (high[i] - low[i]);
    });
    const r3 = ArrayUtils.processArray(pp, (pivot, i) => {
        if (isNaN(pivot)) {
            return NaN;
        }
        return high[i] + 2 * (pivot - low[i]);
    });
    const s3 = ArrayUtils.processArray(pp, (pivot, i) => {
        if (isNaN(pivot)) {
            return NaN;
        }
        return low[i] - 2 * (high[i] - pivot);
    });
    return { pp, r1, r2, r3, s1, s2, s3 };
}
