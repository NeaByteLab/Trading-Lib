import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@core/utils/array-utils';
import { MathUtils } from '@core/utils/math-utils';
import { sanitizeArray } from '@core/utils/validation-utils';
/**
 * Arithmetic Mean - calculates the average of a set of values
 * Formula: Mean = Σ(Values) / n
 *
 * @param values - Array of values
 * @returns Mean value
 * @throws {Error} If values array is empty
 *
 * @example
 * ```typescript
 * const mean = calculateMean([1, 2, 3, 4, 5])
 * // Returns: 3
 * ```
 */
export function calculateMean(values) {
    if (!values || values.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    const validValues = sanitizeArray(values);
    if (validValues.length === 0) {
        return NaN;
    }
    return MathUtils.average(validValues);
}
/**
 * Variance - measures the spread of values around the mean
 * Formula: Variance = Σ((Value - Mean)²) / (n - 1)
 *
 * @param values - Array of values
 * @returns Variance value
 * @throws {Error} If values array is empty
 *
 * @example
 * ```typescript
 * const variance = calculateVariance([1, 2, 3, 4, 5])
 * // Returns: 2.5
 * ```
 */
export function calculateVariance(values) {
    if (!values || values.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    const validValues = sanitizeArray(values);
    if (validValues.length === 0) {
        return NaN;
    }
    if (validValues.length === 1) {
        return 0;
    }
    const mean = calculateMean(validValues);
    if (!isFinite(mean)) {
        return NaN;
    }
    const squaredDiffs = validValues.map(val => Math.pow(val - mean, 2));
    const result = MathUtils.sum(squaredDiffs) / (validValues.length - 1);
    return isFinite(result) ? result : NaN;
}
/**
 * Standard Deviation - measures the dispersion of values around the mean
 * Formula: Standard Deviation = √(Variance)
 *
 * @param values - Array of values
 * @returns Standard deviation value
 * @throws {Error} If values array is empty
 *
 * @example
 * ```typescript
 * const std = calculateStandardDeviation([1, 2, 3, 4, 5])
 * // Returns: 1.5811388300841898
 * ```
 */
export function calculateStandardDeviation(values) {
    if (!values || values.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    const validValues = sanitizeArray(values);
    if (validValues.length === 0) {
        return NaN;
    }
    if (validValues.length === 1) {
        return 0;
    }
    const variance = calculateVariance(validValues);
    if (!isFinite(variance) || variance < 0) {
        return NaN;
    }
    const result = MathUtils.sqrt(variance);
    return isFinite(result) ? result : NaN;
}
/**
 * Create rolling window from array
 *
 * @param data - Source array
 * @param windowSize - Size of rolling window
 * @returns Array of window arrays
 */
export function rollingWindow(data, windowSize) {
    return ArrayUtils.processArray(data, (_, i) => {
        if (i <= data.length - windowSize) {
            return data.slice(i, i + windowSize);
        }
        return null;
    }).filter((window) => window !== null);
}
/**
 * Calculate rolling statistic
 *
 * @param data - Source array
 * @param windowSize - Window size
 * @param statistic - Statistic type
 * @returns Array of rolling statistics
 */
export function calculateRollingStatistic(data, windowSize, statistic) {
    const windows = rollingWindow(data, windowSize);
    const result = [];
    for (const window of windows) {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            result.push(NaN);
            continue;
        }
        switch (statistic) {
            case 'mean':
                result.push(MathUtils.average(validValues));
                break;
            case 'median': {
                const sorted = [...validValues].sort((a, b) => a - b);
                const mid = MathUtils.floor(sorted.length / 2);
                result.push(sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]);
                break;
            }
            case 'min':
                result.push(MathUtils.min(validValues));
                break;
            case 'max':
                result.push(MathUtils.max(validValues));
                break;
            case 'sum':
                result.push(MathUtils.sum(validValues));
                break;
            default:
                result.push(NaN);
        }
    }
    return result;
}
/**
 * Find k-th smallest element using quickselect algorithm
 *
 * @param array - Input array
 * @param k - Position (0-based index)
 * @returns K-th smallest element
 * @throws {Error} If array is empty or k is out of bounds
 */
export function kthSmallest(array, k) {
    if (!Array.isArray(array)) {
        throw new Error(ERROR_MESSAGES.ARRAY_REQUIRED);
    }
    const validValues = sanitizeArray(array);
    if (validValues.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_AFTER_NAN);
    }
    if (k < 0 || k >= validValues.length) {
        throw new Error(ERROR_MESSAGES.K_OUT_OF_BOUNDS.replace('{maxIndex}', String(validValues.length - 1)));
    }
    const workArray = [...validValues];
    return quickSelect(workArray, 0, workArray.length - 1, k);
}
/**
 * Find k-th largest element using quickselect algorithm
 *
 * @param array - Input array
 * @param k - Position (0-based index)
 * @returns K-th largest element
 * @throws {Error} If array is empty or k is out of bounds
 */
export function kthLargest(array, k) {
    if (!Array.isArray(array)) {
        throw new Error(ERROR_MESSAGES.ARRAY_REQUIRED);
    }
    const validValues = sanitizeArray(array);
    if (validValues.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_AFTER_NAN);
    }
    if (k < 0 || k >= validValues.length) {
        throw new Error(ERROR_MESSAGES.K_OUT_OF_BOUNDS.replace('{maxIndex}', String(validValues.length - 1)));
    }
    return kthSmallest(validValues, validValues.length - 1 - k);
}
/**
 * Calculate median using k-selection algorithm
 *
 * @param array - Input array
 * @returns Median value
 * @throws {Error} If array is empty
 */
export function calculateMedian(array) {
    if (!Array.isArray(array)) {
        throw new Error(ERROR_MESSAGES.ARRAY_REQUIRED);
    }
    const validValues = sanitizeArray(array);
    if (validValues.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_AFTER_NAN);
    }
    const n = validValues.length;
    if (n % 2 === 1) {
        return kthSmallest(validValues, Math.floor(n / 2));
    }
    else {
        const lower = kthSmallest(validValues, n / 2 - 1);
        const upper = kthSmallest(validValues, n / 2);
        return (lower + upper) / 2;
    }
}
/**
 * Calculate percentile using k-selection algorithm
 *
 * @param array - Input array
 * @param percentile - Percentile value (0-100)
 * @returns Percentile value
 * @throws {Error} If array is empty or percentile is out of range
 */
export function calculatePercentile(array, percentile) {
    if (!Array.isArray(array)) {
        throw new Error(ERROR_MESSAGES.ARRAY_REQUIRED);
    }
    if (percentile < 0 || percentile > 100) {
        throw new Error(ERROR_MESSAGES.INVALID_PERCENTILE);
    }
    const validValues = sanitizeArray(array);
    if (validValues.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_AFTER_NAN);
    }
    const n = validValues.length;
    const index = Math.floor((percentile / 100) * (n - 1));
    return kthSmallest(validValues, index);
}
/**
 * Quickselect algorithm implementation
 * Efficiently finds k-th smallest element in O(n) average time
 *
 * @param array - Array to search in (modified in place)
 * @param left - Left boundary
 * @param right - Right boundary
 * @param k - Target index
 * @returns K-th smallest element
 */
function quickSelect(array, left, right, k) {
    if (left === right) {
        return array[left];
    }
    const pivotIndex = partition(array, left, right);
    if (k === pivotIndex) {
        return array[k];
    }
    else if (k < pivotIndex) {
        return quickSelect(array, left, pivotIndex - 1, k);
    }
    else {
        return quickSelect(array, pivotIndex + 1, right, k);
    }
}
/**
 * Partition function for quickselect
 * Uses median-of-three pivot selection for better performance
 *
 * @param array - Array to partition
 * @param left - Left boundary
 * @param right - Right boundary
 * @returns Pivot index after partitioning
 */
function partition(array, left, right) {
    const pivotIndex = medianOfThree(array, left, right);
    const pivotValue = array[pivotIndex];
    swap(array, pivotIndex, right);
    let storeIndex = left;
    for (let i = left; i < right; i++) {
        if (array[i] < pivotValue) {
            swap(array, i, storeIndex);
            storeIndex++;
        }
    }
    swap(array, storeIndex, right);
    return storeIndex;
}
/**
 * Select median of three values as pivot for better performance
 *
 * @param array - Input array
 * @param left - Left index
 * @param right - Right index
 * @returns Index of median value
 */
function medianOfThree(array, left, right) {
    const mid = Math.floor((left + right) / 2);
    if (array[left] > array[mid]) {
        swap(array, left, mid);
    }
    if (array[mid] > array[right]) {
        swap(array, mid, right);
    }
    if (array[left] > array[mid]) {
        swap(array, left, mid);
    }
    return mid;
}
/**
 * Swap two elements in array
 *
 * @param array - Array to modify
 * @param i - First index
 * @param j - Second index
 */
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
/**
 * Calculate Shannon Entropy using centralized utilities
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @param bins - Number of bins for discretization
 * @returns Shannon entropy values array
 */
export function calculateShannonEntropy(data, length, bins = 8) {
    return ArrayUtils.processWindow(data, length, (window) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return NaN;
        }
        const returns = calculateLogReturns(validValues);
        const validReturns = returns.filter(r => !isNaN(r));
        if (validReturns.length === 0) {
            return NaN;
        }
        const minReturn = MathUtils.min(validReturns);
        const maxReturn = MathUtils.max(validReturns);
        const binSize = (maxReturn - minReturn) / bins;
        if (binSize === 0) {
            return 0;
        }
        const binCounts = new Array(bins).fill(0);
        ArrayUtils.processArray(validReturns, (ret) => {
            const binIndex = Math.max(0, Math.min(bins - 1, MathUtils.floor((ret - minReturn) / binSize)));
            binCounts[binIndex]++;
            return ret;
        });
        let entropy = 0;
        const totalCount = validReturns.length;
        ArrayUtils.processArray(binCounts, (count) => {
            if (count > 0) {
                const probability = count / totalCount;
                entropy -= probability * MathUtils.log2(probability);
            }
            return count;
        });
        return entropy;
    });
}
/**
 * Calculate log returns from price data
 *
 * @param prices - Array of prices
 * @returns Array of log returns
 */
function calculateLogReturns(prices) {
    return ArrayUtils.processArray(prices.slice(1), (currentPrice, i) => {
        const previousPrice = prices[i];
        if (isNaN(currentPrice) || isNaN(previousPrice) || previousPrice <= 0) {
            return NaN;
        }
        return MathUtils.log(currentPrice / previousPrice);
    });
}
