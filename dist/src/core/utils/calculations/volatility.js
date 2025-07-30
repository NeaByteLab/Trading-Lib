import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@core/utils/array-utils';
import { MathUtils } from '@core/utils/math-utils';
import { sanitizeArray } from '@core/utils/validation-utils';
import { calculateMean, calculateStandardDeviation, calculateVariance } from './statistical';
/**
 * Calculate True Range using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns True Range values array
 */
export function calculateTrueRange(high, low, close) {
    return ArrayUtils.processArray(close, (_currentClose, i) => {
        if (i === 0) {
            return NaN;
        }
        const currentHigh = high[i];
        const currentLow = low[i];
        const previousClose = close[i - 1];
        return MathUtils.max([
            currentHigh - currentLow,
            MathUtils.abs(currentHigh - previousClose),
            MathUtils.abs(currentLow - previousClose)
        ]);
    });
}
/**
 * Calculate bands (upper, middle, lower) using standard deviation
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @param multiplier - Standard deviation multiplier
 * @returns Bands object with upper, middle, and lower arrays
 */
export function calculateBands(data, length, multiplier) {
    const bands = ArrayUtils.processWindow(data, length, (window, _i) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return { upper: NaN, middle: NaN, lower: NaN };
        }
        const ma = MathUtils.average(validValues);
        const variance = calculateVariance(validValues);
        const stdDev = Math.sqrt(variance);
        const bandDistance = stdDev * multiplier;
        return {
            upper: ma + bandDistance,
            middle: ma,
            lower: ma - bandDistance
        };
    });
    return {
        upper: bands.map(b => b.upper),
        middle: bands.map(b => b.middle),
        lower: bands.map(b => b.lower)
    };
}
/**
 * Calculate Bollinger Band Width using centralized utilities
 *
 * @param data - Price data array
 * @param length - Period for moving average
 * @param multiplier - Standard deviation multiplier
 * @returns Array of band width values
 * @throws {Error} If data is invalid or missing required fields
 */
export function calculateBollingerBandWidth(data, length, multiplier) {
    if (!data || data.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    if (multiplier <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER);
    }
    return ArrayUtils.processWindow(data, length, (window) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return NaN;
        }
        const smaValue = calculateMean(validValues);
        const std = calculateStandardDeviation(validValues);
        const upperBand = smaValue + (multiplier * std);
        const lowerBand = smaValue - (multiplier * std);
        return ((upperBand - lowerBand) / smaValue) * 100;
    });
}
/**
 * Calculate Donchian Channel using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Calculation period
 * @returns Object with upper, middle, and lower band arrays
 * @throws {Error} If data is invalid or missing required fields
 */
export function calculateDonchianChannel(high, low, length) {
    if (!high || high.length === 0 || !low || low.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (high.length !== low.length) {
        throw new Error('High and low arrays must have the same length');
    }
    if (length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    const upper = ArrayUtils.processWindow(high, length, (window) => {
        const validValues = sanitizeArray(window);
        return validValues.length > 0 ? MathUtils.max(validValues) : NaN;
    });
    const lower = ArrayUtils.processWindow(low, length, (window) => {
        const validValues = sanitizeArray(window);
        return validValues.length > 0 ? MathUtils.min(validValues) : NaN;
    });
    const middle = ArrayUtils.processArray(upper, (upperVal, i) => {
        const lowerVal = lower[i];
        if (upperVal === undefined || lowerVal === undefined || isNaN(upperVal) || isNaN(lowerVal)) {
            return NaN;
        }
        return (upperVal + lowerVal) / 2;
    });
    return { upper, middle, lower };
}
/**
 * Calculate Price Channels using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Channel calculation period
 * @returns Object with upper and lower channel values
 * @throws {Error} If data is invalid or missing required fields
 */
export function calculatePriceChannels(high, low, length) {
    if (!high || high.length === 0 || !low || low.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (high.length !== low.length) {
        throw new Error(ERROR_MESSAGES.HIGH_LOW_LENGTH_MISMATCH);
    }
    if (length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    const upper = ArrayUtils.processWindow(high, length, (window) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return NaN;
        }
        return MathUtils.max(validValues);
    });
    const lower = ArrayUtils.processWindow(low, length, (window) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return NaN;
        }
        return MathUtils.min(validValues);
    });
    return { upper, lower };
}
/**
 * Calculate Keltner Channel using centralized utilities
 *
 * @param close - Close prices array
 * @param atrValues - ATR values array
 * @param multiplier - ATR multiplier
 * @returns Object with upper, middle, and lower band arrays
 * @throws {Error} If data is invalid or missing required fields
 */
export function calculateKeltnerChannel(close, atrValues, multiplier) {
    if (!close || close.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (!atrValues || atrValues.length === 0) {
        throw new Error(ERROR_MESSAGES.ATR_VALUES_REQUIRED);
    }
    if (close.length !== atrValues.length) {
        throw new Error(ERROR_MESSAGES.CLOSE_ATR_LENGTH_MISMATCH);
    }
    if (multiplier <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER);
    }
    const middle = ArrayUtils.processWindow(close, 20, (window) => {
        const validValues = sanitizeArray(window);
        return validValues.length > 0 ? MathUtils.average(validValues) : NaN;
    });
    const atrMultiplied = ArrayUtils.processArray(atrValues, atr => atr * multiplier);
    const upper = ArrayUtils.processArray(middle, (mid, i) => {
        const atrVal = atrMultiplied[i];
        return mid !== undefined && atrVal !== undefined && !isNaN(mid) && !isNaN(atrVal)
            ? mid + atrVal
            : NaN;
    });
    const lower = ArrayUtils.processArray(middle, (mid, i) => {
        const atrVal = atrMultiplied[i];
        return mid !== undefined && atrVal !== undefined && !isNaN(mid) && !isNaN(atrVal)
            ? mid - atrVal
            : NaN;
    });
    return { upper, middle, lower };
}
