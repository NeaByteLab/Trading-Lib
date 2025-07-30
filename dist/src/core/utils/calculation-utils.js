/**
 * Centralized calculation utilities for technical indicators
 *
 * Provides common calculation functions to eliminate code duplication.
 * All indicators should use these utilities instead of manual implementations.
 *
 * @example
 * ```typescript
 * import { PriceCalculations, calculateRSI } from '@utils/calculation-utils'
 *
 * const typical = PriceCalculations.typical(data)
 * const rsi = calculateRSI(data.close, 14)
 * ```
 */
import { ArrayUtils } from './array-utils';
import { MathUtils } from './math-utils';
import { sanitizeArray } from './validation-utils';
const LENGTH_ERROR = 'Length must be positive';
const EMPTY_ARRAY_ERROR = 'Array cannot be empty';
/**
 * Price calculation utilities
 *
 * Provides centralized price calculation functions to eliminate code duplication.
 * All indicators should use these utilities instead of manual implementations.
 */
export const PriceCalculations = {
    /**
     * Calculate typical price (HLC3)
     *
     * @param data - Market data with high, low, close arrays
     * @returns Array of typical prices
     */
    typical(data) {
        return ArrayUtils.processArray(data.high, (_, i) => {
            const high = data.high[i];
            const low = data.low[i];
            const close = data.close[i];
            return (high + low + close) / 3;
        });
    },
    /**
     * Calculate HL2 (High + Low) / 2
     *
     * @param data - Market data with high, low arrays
     * @returns Array of HL2 values
     */
    hl2(data) {
        return ArrayUtils.processArray(data.high, (_, i) => {
            const high = data.high[i];
            const low = data.low[i];
            return (high + low) / 2;
        });
    },
    /**
     * Calculate OHLC4 (Open + High + Low + Close) / 4
     *
     * @param data - Market data with open, high, low, close arrays
     * @returns Array of OHLC4 values
     */
    ohlc4(data) {
        return ArrayUtils.processArray(data.open, (_, i) => {
            const open = data.open[i];
            const high = data.high[i];
            const low = data.low[i];
            const close = data.close[i];
            return (open + high + low + close) / 4;
        });
    }
};
/**
 * Combine multiple arrays with different lengths
 *
 * @param arrays - Arrays to combine
 * @returns Combined array
 */
export function combineArrays(arrays) {
    const maxLength = MathUtils.max(arrays.map(arr => arr.length));
    const result = [];
    for (let i = 0; i < maxLength; i++) {
        const values = arrays.map(arr => arr[i]).filter(val => val !== undefined && !isNaN(val));
        result.push(values.length > 0 ? MathUtils.average(values) : NaN);
    }
    return result;
}
/**
 * Calculate price changes
 *
 * @param data - Source data array
 * @returns Array of price changes
 */
export function calculatePriceChanges(data) {
    if (!data || data.length === 0) {
        throw new Error(EMPTY_ARRAY_ERROR);
    }
    const result = [];
    for (let i = 1; i < data.length; i++) {
        const current = data[i];
        const previous = data[i - 1];
        result.push(isNaN(current) || isNaN(previous) ? NaN : current - previous);
    }
    return result;
}
/**
 * Calculate gains and losses
 *
 * @param data - Source data array
 * @returns Object with gains and losses arrays
 */
export function calculateGainsAndLosses(data) {
    const changes = calculatePriceChanges(data);
    const gains = [];
    const losses = [];
    ArrayUtils.processArray(changes, (change) => {
        if (isNaN(change)) {
            gains.push(NaN);
            losses.push(NaN);
        }
        else if (change > 0) {
            gains.push(change);
            losses.push(0);
        }
        else {
            gains.push(0);
            losses.push(MathUtils.abs(change));
        }
    });
    return { gains, losses };
}
/**
 * Calculate mean of array
 *
 * @param values - Array of numbers
 * @returns Mean value
 * @throws {Error} If array is empty
 */
export function calculateMean(values) {
    if (!values || values.length === 0) {
        throw new Error(EMPTY_ARRAY_ERROR);
    }
    const validValues = sanitizeArray(values);
    if (validValues.length === 0) {
        return NaN;
    }
    // Check if any value is NaN - return NaN if any NaN found
    if (values.some(val => isNaN(val))) {
        return NaN;
    }
    return MathUtils.average(validValues);
}
/**
 * Calculate variance of array
 *
 * @param values - Array of numbers
 * @returns Variance value
 */
export function calculateVariance(values) {
    const validValues = sanitizeArray(values);
    if (validValues.length === 0) {
        return NaN;
    }
    const mean = calculateMean(validValues);
    if (isNaN(mean)) {
        return NaN;
    }
    const squaredDifferences = validValues.map(val => MathUtils.pow(val - mean, 2));
    return MathUtils.average(squaredDifferences);
}
/**
 * Calculate standard deviation
 *
 * @param values - Array of numbers
 * @returns Standard deviation
 */
export function calculateStandardDeviation(values) {
    const variance = calculateVariance(values);
    return isNaN(variance) ? NaN : MathUtils.sqrt(variance);
}
/**
 * Create rolling window from array
 *
 * @param data - Source array
 * @param windowSize - Size of rolling window
 * @returns Array of window arrays
 */
export function rollingWindow(data, windowSize) {
    const windows = [];
    for (let i = 0; i <= data.length - windowSize; i++) {
        windows.push(data.slice(i, i + windowSize));
    }
    return windows;
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
                const sorted = validValues.sort((a, b) => a - b);
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
 * Apply exponential smoothing to data
 *
 * @param data - Source data array
 * @param alpha - Smoothing factor (0-1)
 * @returns Smoothed data array
 */
export function exponentialSmoothing(data, alpha) {
    if (alpha < 0 || alpha > 1) {
        throw new Error('Alpha must be between 0 and 1');
    }
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            result.push(data[i]);
        }
        else {
            const smoothed = (alpha * data[i]) + ((1 - alpha) * result[i - 1]);
            result.push(smoothed);
        }
    }
    return result;
}
/**
 * Apply Wilder's smoothing to data
 *
 * @param data - Source data array
 * @param length - Smoothing period
 * @returns Smoothed data array
 */
export function wildersSmoothing(data, length) {
    if (length <= 0) {
        throw new Error(LENGTH_ERROR);
    }
    const alpha = 1 / length;
    return exponentialSmoothing(data, alpha);
}
/**
 * Safe division with fallback
 *
 * @param numerator - Numerator
 * @param denominator - Denominator
 * @param fallback - Fallback value if division by zero
 * @returns Division result or fallback
 */
export function safeDivision(numerator, denominator, fallback = 0) {
    if (denominator === 0 || isNaN(denominator)) {
        return fallback;
    }
    return numerator / denominator;
}
/**
 * Fill NaN values with specified value
 *
 * @param data - Source array
 * @param fillValue - Value to fill NaN with
 * @returns Array with filled values
 */
export function fillNaN(data, fillValue) {
    return ArrayUtils.processArray(data, (value) => {
        return isNaN(value) ? fillValue : value;
    });
}
/**
 * Shift array by specified amount
 *
 * @param data - Source array
 * @param offset - Shift amount
 * @returns Shifted array
 */
export function shiftArray(data, offset) {
    return ArrayUtils.shift(data, offset);
}
/**
 * Calculate RSI using centralized utilities
 *
 * @param data - Source data array
 * @param length - RSI period
 * @returns RSI values array
 */
export function calculateRSI(data, length) {
    if (length <= 0) {
        throw new Error(LENGTH_ERROR);
    }
    const { gains, losses } = calculateGainsAndLosses(data);
    const avgGains = wildersSmoothing(gains, length);
    const avgLosses = wildersSmoothing(losses, length);
    // Create result array with same length as input data
    const result = [];
    // Fill first element with NaN since we need at least 2 points for changes
    result.push(NaN);
    // Process the gains/losses arrays
    for (let i = 0; i < avgGains.length; i++) {
        const avgGain = avgGains[i];
        const avgLoss = avgLosses[i];
        if (isNaN(avgGain) || isNaN(avgLoss)) {
            result.push(NaN);
        }
        else if (avgLoss === 0) {
            result.push(100);
        }
        else {
            const rs = avgGain / avgLoss;
            result.push(100 - (100 / (1 + rs)));
        }
    }
    return result;
}
/**
 * Calculate CCI using centralized utilities
 *
 * @param data - Source data array (should be typical prices HLC3)
 * @param length - CCI period
 * @returns CCI values array
 */
export function calculateCCI(data, length) {
    if (length <= 0) {
        throw new Error(LENGTH_ERROR);
    }
    const CCI_CONSTANT = 0.015;
    return ArrayUtils.processWindow(data, length, (window, _i) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return NaN;
        }
        // Use the current price (last element in window) for CCI calculation
        const currentPrice = window[window.length - 1];
        const sma = calculateMean(validValues);
        const meanDeviation = calculateMean(validValues.map(val => MathUtils.abs(val - sma)));
        return meanDeviation === 0 ? 0 : (currentPrice - sma) / (CCI_CONSTANT * meanDeviation);
    });
}
/**
 * Calculate CCI from OHLC data using typical prices
 *
 * @param data - Market data with high, low, close arrays
 * @param length - CCI period
 * @returns CCI values array
 */
export function calculateCCIFromOHLC(data, length) {
    if (length <= 0) {
        throw new Error(LENGTH_ERROR);
    }
    const typicalPrices = PriceCalculations.typical(data);
    return calculateCCI(typicalPrices, length);
}
/**
 * Calculate range percentage
 *
 * @param value - Current value
 * @param min - Minimum value
 * @param max - Maximum value
 * @param multiplier - Multiplier for percentage (default: 100)
 * @returns Range percentage
 */
export function calculateRangePercentage(value, min, max, multiplier = 100) {
    if (max === min) {
        return 0;
    }
    return safeDivision(value - min, max - min) * multiplier;
}
/**
 * Calculate high/low range for window
 *
 * @param highData - High prices array
 * @param lowData - Low prices array
 * @param currentIndex - Current index
 * @param windowSize - Window size
 * @returns Object with highest and lowest values
 */
export function calculateHighLowRange(highData, lowData, currentIndex, windowSize) {
    const highSlice = ArrayUtils.getWindowSlice(highData, currentIndex, windowSize);
    const lowSlice = ArrayUtils.getWindowSlice(lowData, currentIndex, windowSize);
    // Handle empty arrays gracefully
    if (highSlice.length === 0 || lowSlice.length === 0) {
        return { highest: NaN, lowest: NaN };
    }
    return {
        highest: MathUtils.max(highSlice),
        lowest: MathUtils.min(lowSlice)
    };
}
