import { MathUtils } from './math-utils';
import { sanitizeArray } from './validation-utils';
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
export const ArrayUtils = {
    /**
     * Process array with custom function
     *
     * @param data - Input array
     * @param processor - Processing function
     * @returns Processed array
     */
    processArray(data, processor) {
        return data.map(processor);
    },
    /**
     * Process array with window-based calculation
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param processor - Window processing function
     * @returns Processed array
     */
    processWindow(data, windowSize, processor) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            if (i < windowSize - 1) {
                result.push(NaN);
                continue;
            }
            const window = this.getWindowSlice(data, i, windowSize);
            result.push(processor(window, i));
        }
        return result;
    },
    /**
     * Calculate rolling statistics
     *
     * @param data - Input array
     * @param windowSize - Window size
     * @param statistic - Statistic type
     * @returns Array of statistics
     */
    rollingStatistic(data, windowSize, statistic) {
        return this.processWindow(data, windowSize, (window) => {
            const validValues = sanitizeArray(window);
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
     * Calculate percentage change
     *
     * @param data - Input array
     * @param period - Lookback period
     * @returns Array of percentage changes
     */
    percentChange(data, period = 1) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            if (i < period) {
                result.push(NaN);
                continue;
            }
            const current = data[i];
            const previous = data[i - period];
            if (isNaN(current) || isNaN(previous) || previous === 0) {
                result.push(NaN);
            }
            else {
                result.push(((current - previous) / previous) * 100);
            }
        }
        return result;
    },
    /**
     * Calculate momentum (price change)
     *
     * @param data - Input array
     * @param period - Lookback period
     * @returns Array of momentum values
     */
    momentum(data, period = 1) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            if (i < period) {
                result.push(NaN);
                continue;
            }
            const current = data[i];
            const previous = data[i - period];
            if (isNaN(current) || isNaN(previous)) {
                result.push(NaN);
            }
            else {
                result.push(current - previous);
            }
        }
        return result;
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
            throw new Error('Data must be an array');
        }
        if (data.length < minLength) {
            throw new Error(`Data must have at least ${minLength} elements`);
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
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const sourceIndex = i - offset;
            if (sourceIndex >= 0 && sourceIndex < data.length) {
                result.push(data[sourceIndex]);
            }
            else {
                result.push(NaN);
            }
        }
        return result;
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
    }
};
