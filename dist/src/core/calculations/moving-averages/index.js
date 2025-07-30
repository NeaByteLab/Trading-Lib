import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { MathUtils } from '@utils/math-utils';
import { sanitizeArray } from '@utils/validation-utils';
/**
 * Calculate moving average using specified type
 *
 * @param data - Source data array
 * @param length - Moving average period
 * @param type - Moving average type (default: 'sma')
 * @returns Array of moving average values
 * @throws {Error} If data is empty or length is invalid
 */
export function movingAverage(data, length, type = 'sma') {
    if (!data || data.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    if (!['sma', 'ema', 'wma', 'hull'].includes(type)) {
        throw new Error(ERROR_MESSAGES.INVALID_MOVING_AVERAGE_TYPE);
    }
    switch (type) {
        case 'ema':
            return calculateEMA(data, length);
        case 'wma':
            return calculateWMA(data, length);
        case 'hull':
            return calculateHMA(data, length);
        default:
            return calculateSMA(data, length);
    }
}
/**
 * Calculate Simple Moving Average (SMA)
 *
 * Uses centralized window processing utilities.
 * Formula: SMA = Σ(Price) / Length
 *
 * @param data - Source data array
 * @param length - SMA period
 * @returns Array of SMA values
 */
function calculateSMA(data, length) {
    return ArrayUtils.processWindow(data, length, (window) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return NaN;
        }
        return MathUtils.average(validValues);
    });
}
/**
 * Calculate Exponential Moving Average (EMA)
 *
 * Uses centralized calculation utilities.
 * Formula: EMA = Price × α + Previous EMA × (1 - α) where α = 2/(Length + 1)
 *
 * @param data - Source data array
 * @param length - EMA period
 * @returns Array of EMA values
 */
function calculateEMA(data, length) {
    const smoothingFactor = 2 / (length + 1);
    return ArrayUtils.processArray(data, (val, i) => {
        if (i < length - 1) {
            // First length-1 values should be NaN (not enough data)
            return NaN;
        }
        else if (i === length - 1) {
            // First EMA value is SMA of first 'length' values
            const window = data.slice(0, length);
            const validValues = sanitizeArray(window);
            if (validValues.length === 0) {
                return NaN;
            }
            else {
                return MathUtils.average(validValues);
            }
        }
        else {
            // Subsequent values use EMA formula
            const previousEMA = data[i - 1] ?? 0;
            if (isNaN(previousEMA)) {
                return NaN;
            }
            else {
                return (val * smoothingFactor) + (previousEMA * (1 - smoothingFactor));
            }
        }
    });
}
/**
 * Calculate Weighted Moving Average (WMA)
 *
 * Uses centralized window processing utilities.
 * Formula: WMA = Σ(Price × Weight) / Σ(Weights)
 *
 * @param data - Source data array
 * @param length - WMA period
 * @returns Array of WMA values
 */
function calculateWMA(data, length) {
    return ArrayUtils.processWindow(data, length, (window) => {
        const validValues = sanitizeArray(window);
        if (validValues.length === 0) {
            return NaN;
        }
        const weights = ArrayUtils.processArray(validValues, (_, i) => i + 1);
        const weightedValues = ArrayUtils.processArray(validValues, (val, i) => val * weights[i]);
        const weightedSum = MathUtils.sum(weightedValues);
        const weightSum = MathUtils.sum(weights);
        return weightedSum / weightSum;
    });
}
/**
 * Calculate Hull Moving Average (HMA)
 *
 * Uses centralized calculation utilities.
 * Formula: HMA = WMA(2 × WMA(n/2) - WMA(n))
 *
 * @param data - Source data array
 * @param length - HMA period
 * @returns Array of HMA values
 */
function calculateHMA(data, length) {
    const halfLength = MathUtils.floor(length / 2);
    const sqrtLength = MathUtils.floor(MathUtils.sqrt(length));
    const wma1 = calculateWMA(data, halfLength);
    const wma2 = calculateWMA(data, length);
    const diff = ArrayUtils.processArray(wma1, (val, i) => 2 * val - wma2[i]);
    return calculateWMA(diff, sqrtLength);
}
