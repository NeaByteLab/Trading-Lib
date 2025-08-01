import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { MathUtils } from '@utils/math-utils';
import { validateAndSanitizeWindow } from '@utils/validation-utils';
/**
 * Centralized array processing utilities
 * Eliminates duplication across all indicators
 */
export const ArrayUtils = {
    /**
     * Process array with custom function
     *
     * @param data - Input array
     * @param processor - Processing function
     * @returns Processed array
     */
    processArray(data, processor) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(processor(data[i], i));
        }
        return result;
    },
    /**
     * Process array with sliding window
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @returns Processed array
     */
    processWindow(data, windowSize, processor) {
        const result = [];
        for (let i = windowSize - 1; i < data.length; i++) {
            // Fix: Prevent integer overflow and negative indices
            const startIndex = Math.max(0, i - windowSize + 1);
            const window = data.slice(startIndex, i + 1);
            result.push(processor(window, i));
        }
        return result;
    },
    /**
     * Optimized window processing for large datasets
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @param chunkSize - Chunk size for large datasets
     * @returns Processed array
     */
    processLargeWindow(data, windowSize, processor, chunkSize = 10000) {
        if (data.length <= chunkSize) {
            return this.processWindow(data, windowSize, processor);
        }
        const result = [];
        const overlap = windowSize - 1;
        for (let chunkStart = 0; chunkStart < data.length; chunkStart += chunkSize - overlap) {
            const chunkEnd = Math.min(chunkStart + chunkSize, data.length);
            const chunk = data.slice(chunkStart, chunkEnd);
            for (let i = windowSize - 1; i < chunk.length; i++) {
                const window = chunk.slice(i - windowSize + 1, i + 1);
                const globalIndex = chunkStart + i;
                result.push(processor(window, globalIndex));
            }
        }
        return result;
    },
    /**
     * Calculate rolling statistic
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param statistic - Statistic type
     * @returns Array of rolling statistics
     */
    rollingStatistic(data, windowSize, statistic) {
        return this.processWindow(data, windowSize, (window) => {
            const validValues = validateAndSanitizeWindow(window);
            if (validValues.length === 0) {
                return NaN;
            }
            switch (statistic) {
                case 'min':
                    return MathUtils.min(validValues);
                case 'max':
                    return MathUtils.max(validValues);
                case 'mean':
                    return MathUtils.average(validValues);
                case 'sum':
                    return MathUtils.sum(validValues);
                default:
                    return NaN;
            }
        });
    },
    /**
     * Optimized rolling statistic for large datasets
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param statistic - Statistic type
     * @param chunkSize - Chunk size for large datasets
     * @returns Array of rolling statistics
     */
    rollingStatisticLarge(data, windowSize, statistic, chunkSize = 10000) {
        return this.processLargeWindow(data, windowSize, (window) => {
            const validValues = validateAndSanitizeWindow(window);
            if (validValues.length === 0) {
                return NaN;
            }
            switch (statistic) {
                case 'min':
                    return MathUtils.min(validValues);
                case 'max':
                    return MathUtils.max(validValues);
                case 'mean':
                    return MathUtils.average(validValues);
                case 'sum':
                    return MathUtils.sum(validValues);
                default:
                    return NaN;
            }
        }, chunkSize);
    },
    /**
     * Calculate percentage change
     *
     * @param data - Input array
     * @param period - Lookback period
     * @returns Array of percentage changes
     */
    percentChange(data, period = 1) {
        return this.processArray(data, (current, i) => {
            if (i < period) {
                return NaN;
            }
            const previous = data[i - period];
            if (isNaN(current) || isNaN(previous) || previous === 0) {
                return NaN;
            }
            return ((current - previous) / previous) * 100;
        });
    },
    /**
     * Calculate momentum (price change)
     *
     * @param data - Input array
     * @param period - Lookback period
     * @returns Array of momentum values
     */
    momentum(data, period = 1) {
        return this.processArray(data, (current, i) => {
            if (i < period) {
                return NaN;
            }
            const previous = data[i - period];
            if (isNaN(current) || isNaN(previous)) {
                return NaN;
            }
            return current - previous;
        });
    },
    /**
     * Validate array data
     *
     * @param data - Input array
     * @param minLength - Minimum required length
     * @throws {Error} If validation fails
     */
    validateArray(data, minLength = 1) {
        if (!Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.ARRAY_REQUIRED);
        }
        if (data.length < minLength) {
            throw new Error(ERROR_MESSAGES.MIN_LENGTH_REQUIRED.replace('{minLength}', minLength.toString()));
        }
    },
    /**
     * Fill array with NaN values
     *
     * @param length - Array length
     * @param offset - Offset for NaN values
     * @returns Array filled with NaN values
     */
    fillNaN(length, offset = 0) {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(i < offset ? NaN : 0);
        }
        return result;
    },
    /**
     * Shift array by specified amount
     *
     * @param data - Source array
     * @param offset - Shift amount (positive = forward, negative = backward)
     * @returns Shifted array
     */
    shift(data, offset) {
        return this.processArray(data, (_, i) => {
            const sourceIndex = i - offset;
            if (sourceIndex >= 0 && sourceIndex < data.length) {
                return data[sourceIndex];
            }
            return NaN;
        });
    },
    /**
     * Get window slice for rolling calculations
     *
     * @param data - Source array
     * @param currentIndex - Current index
     * @param windowSize - Window size
     * @returns Window slice
     */
    getWindowSlice(data, currentIndex, windowSize) {
        return data.slice(currentIndex - windowSize + 1, currentIndex + 1);
    },
    /**
     * Centralized window processing with validation
     * Eliminates duplication in array processing patterns
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @returns Processed array
     */
    processValidWindow(data, windowSize, processor) {
        return this.processWindow(data, windowSize, (window) => {
            const validValues = window.filter(val => !isNaN(Number(val)));
            return validValues.length > 0 ? processor(validValues) : NaN;
        });
    },
    /**
     * Optimized window processing for large datasets
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Processing function
     * @param chunkSize - Chunk size for large datasets
     * @returns Processed array
     */
    processValidWindowLarge(data, windowSize, processor, chunkSize = 10000) {
        return this.processLargeWindow(data, windowSize, (window) => {
            const validValues = window.filter(val => !isNaN(Number(val)));
            return validValues.length > 0 ? processor(validValues) : NaN;
        }, chunkSize);
    },
    /**
     * Centralized array validation and processing
     * Eliminates duplication in validation patterns
     *
     * @param data - Input array
     * @param processor - Processing function
     * @param minLength - Minimum required length
     * @returns Processed array
     */
    processValidArray(data, processor, minLength = 1) {
        this.validateArray(data, minLength);
        const validValues = data.filter(val => !isNaN(Number(val)));
        return validValues.length > 0 ? processor(validValues) : NaN;
    },
    /**
     * Memory-efficient streaming processor for large datasets
     *
     * @param data - Input array
     * @param processor - Processing function
     * @param chunkSize - Chunk size
     * @returns Generator for streaming results
     */
    *streamProcess(data, processor, chunkSize = 10000) {
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            yield processor(chunk);
        }
    },
    /**
     * Optimized array processing with memory management
     *
     * @param data - Input array
     * @param processor - Processing function
     * @param chunkSize - Chunk size for large datasets
     * @returns Processed array
     */
    processWithChunking(data, processor, chunkSize = 10000) {
        if (data.length <= chunkSize) {
            return processor(data);
        }
        const results = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            const chunkResults = processor(chunk);
            results.push(...chunkResults);
        }
        return results;
    }
};
