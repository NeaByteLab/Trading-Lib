import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { calculateRMA } from '@core/calculations/moving-averages/rma';
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
    if (!['sma', 'ema', 'wma', 'hull', 'rma'].includes(type)) {
        throw new Error(ERROR_MESSAGES.INVALID_MOVING_AVERAGE_TYPE);
    }
    switch (type) {
        case 'ema':
            return calculateEMA(data, length);
        case 'wma':
            return calculateWMA(data, length);
        case 'hull':
            return calculateHMA(data, length);
        case 'rma':
            return calculateRMA(data, length);
        default:
            return calculateSMA(data, length);
    }
}
/**
 * Calculate Simple Moving Average (SMA) with numerical stability
 *
 * Uses centralized window processing utilities.
 * Formula: SMA = Σ(Price) / n
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
    const result = [];
    const firstEMA = findFirstEMA(data, length);
    if (firstEMA === null) {
        return Array(data.length).fill(NaN);
    }
    for (let i = 0; i < firstEMA.index; i++) {
        result.push(NaN);
    }
    result.push(firstEMA.value);
    for (let i = firstEMA.index + 1; i < data.length; i++) {
        const previousEMA = result[i - 1];
        const currentValue = data[i];
        if (isNaN(previousEMA) || isNaN(currentValue) || !isFinite(previousEMA) || !isFinite(currentValue)) {
            result.push(NaN);
        }
        else {
            const currentEMA = (currentValue * smoothingFactor) + (previousEMA * (1 - smoothingFactor));
            result.push(isFinite(currentEMA) ? currentEMA : NaN);
        }
    }
    return result;
}
/**
 * Find the first valid EMA value and its index with numerical stability
 *
 * @param data - Source data array
 * @param length - EMA period
 * @returns Object with index and value, or null if no valid EMA found
 */
function findFirstEMA(data, length) {
    if (data.length < length) {
        return null;
    }
    const firstWindow = data.slice(0, length);
    const validValues = sanitizeArray(firstWindow);
    if (validValues.length === 0) {
        return null;
    }
    const firstEMA = MathUtils.average(validValues);
    return isFinite(firstEMA) ? { index: length - 1, value: firstEMA } : null;
}
/**
 * Calculate Weighted Moving Average (WMA) with numerical stability
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
        const weightedSum = MathUtils.sum(validValues.map((val, i) => val * weights[i]));
        const weightSum = MathUtils.sum(weights);
        const result = weightSum === 0 ? NaN : weightedSum / weightSum;
        return isFinite(result) ? result : NaN;
    });
}
/**
 * Calculate Hull Moving Average (HMA) with numerical stability
 *
 * Uses centralized calculation utilities.
 * Formula: HMA = WMA(2 × WMA(n/2) - WMA(n))
 *
 * @param data - Source data array
 * @param length - HMA period
 * @returns Array of HMA values
 */
function calculateHMA(data, length) {
    if (data.length < length) {
        return Array(data.length).fill(NaN);
    }
    const halfLength = MathUtils.floor(length / 2);
    const sqrtLength = Math.max(1, MathUtils.floor(MathUtils.sqrt(length)));
    // Calculate WMA(n/2) and WMA(n)
    const wma1 = calculateWMA(data, halfLength);
    const wma2 = calculateWMA(data, length);
    // Ensure both arrays have the same length as the input data
    const paddedWma1 = wma1.length === data.length ? wma1 : Array(data.length - wma1.length).fill(NaN).concat(wma1);
    const paddedWma2 = wma2.length === data.length ? wma2 : Array(data.length - wma2.length).fill(NaN).concat(wma2);
    // Calculate 2 * WMA(n/2) - WMA(n)
    const diff = [];
    for (let i = 0; i < data.length; i++) {
        const wma1Val = paddedWma1[i];
        const wma2Val = paddedWma2[i];
        if (wma1Val !== undefined && wma2Val !== undefined &&
            !isNaN(wma1Val) && !isNaN(wma2Val) &&
            isFinite(wma1Val) && isFinite(wma2Val)) {
            const result = 2 * wma1Val - wma2Val;
            diff.push(isFinite(result) ? result : NaN);
        }
        else {
            diff.push(NaN);
        }
    }
    // Calculate final WMA on the difference
    return calculateWMA(diff, sqrtLength);
}
