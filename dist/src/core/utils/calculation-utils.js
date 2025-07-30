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
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from './array-utils';
import { MathUtils } from './math-utils';
import { sanitizeArray } from './validation-utils';
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
 * Calculate mean of array
 *
 * @param values - Array of numbers
 * @returns Mean value
 * @throws {Error} If array is empty
 */
export function calculateMean(values) {
    if (!values || values.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    const validValues = sanitizeArray(values);
    if (validValues.length === 0) {
        return NaN;
    }
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
    // Use population variance formula: Σ(x - μ)² / n
    return MathUtils.sum(squaredDifferences) / validValues.length;
}
/**
 * Calculate standard deviation
 *
 * @param values - Array of values
 * @returns Standard deviation
 */
export function calculateStandardDeviation(values) {
    if (!values || values.length === 0) {
        return NaN;
    }
    const validValues = sanitizeArray(values);
    if (validValues.length === 0) {
        return NaN;
    }
    const variance = calculateVariance(validValues);
    return MathUtils.sqrt(variance);
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
        throw new Error(ERROR_MESSAGES.INVALID_ALPHA);
    }
    return ArrayUtils.processArray(data, (val, i) => {
        if (i === 0) {
            return val;
        }
        else {
            return (alpha * val) + ((1 - alpha) * (data[i - 1] ?? 0));
        }
    });
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
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    return ArrayUtils.processArray(data, (val, i) => {
        if (i < length - 1) {
            return NaN;
        }
        else if (i === length - 1) {
            // First smoothed value is the average of first 'length' values
            const sum = data.slice(0, length).reduce((acc, v) => acc + v, 0);
            return sum / length;
        }
        else {
            // Subsequent values use Wilder's smoothing formula
            const prevSmoothed = data[i - 1] ?? 0;
            return ((prevSmoothed * (length - 1)) + val) / length;
        }
    });
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
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    // Calculate price changes
    const changes = ArrayUtils.processArray(data, (current, i) => {
        if (i === 0) {
            // First value has no previous value
            return NaN;
        }
        const previous = data[i - 1];
        return isNaN(current) || isNaN(previous) ? NaN : current - previous;
    });
    // Calculate gains and losses
    const gains = ArrayUtils.processArray(changes, (change) => {
        if (isNaN(change)) {
            return NaN;
        }
        return change > 0 ? change : 0;
    });
    const losses = ArrayUtils.processArray(changes, (change) => {
        if (isNaN(change)) {
            return NaN;
        }
        return change < 0 ? MathUtils.abs(change) : 0;
    });
    const avgGains = wildersSmoothing(gains, length);
    const avgLosses = wildersSmoothing(losses, length);
    return ArrayUtils.processArray(avgGains, (avgGain, i) => {
        const avgLoss = avgLosses[i];
        if (isNaN(avgGain) || isNaN(avgLoss)) {
            return NaN;
        }
        if (avgLoss === 0) {
            return 100;
        }
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    });
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
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    const CCI_CONSTANT = 0.015;
    return ArrayUtils.processWindow(data, length, (window, _i) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return NaN;
        }
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
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
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
    if (highSlice.length === 0 || lowSlice.length === 0) {
        return { highest: NaN, lowest: NaN };
    }
    return {
        highest: MathUtils.max(highSlice),
        lowest: MathUtils.min(lowSlice)
    };
}
