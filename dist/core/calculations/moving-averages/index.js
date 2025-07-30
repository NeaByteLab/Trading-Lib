import { calculateRollingStatistic } from '@utils/calculation-utils';
/**
 * Unified moving average function with DRY principle
 *
 * Provides all moving average types using centralized calculation utilities.
 * Eliminates code duplication and ensures consistent algorithms.
 *
 * @param data - Source data array
 * @param length - Window length for calculation
 * @param type - Moving average type ('sma', 'ema', 'wma', 'hull')
 * @returns Array of moving average values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const sma = movingAverage(prices, 3, 'sma')
 * const ema = movingAverage(prices, 3, 'ema')
 * ```
 */
export function movingAverage(data, length, type = 'sma') {
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
    }
    if (length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    switch (type) {
        case 'sma':
            return calculateRollingStatistic(data, length, 'mean');
        case 'ema':
            return exponentialMovingAverage(data, length);
        case 'wma':
            return weightedMovingAverage(data, length);
        case 'hull':
            return hullMovingAverage(data, length);
        default:
            return calculateRollingStatistic(data, length, 'mean');
    }
}
/**
 * Calculate Exponential Moving Average (EMA)
 *
 * Uses exponential smoothing with proper algorithm implementation.
 *
 * @param data - Source data array
 * @param length - EMA period
 * @returns Array of EMA values
 */
function exponentialMovingAverage(data, length) {
    const alpha = 2 / (length + 1);
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const currentValue = data[i];
        if (currentValue === undefined || isNaN(currentValue)) {
            result.push(NaN);
            continue;
        }
        if (i === 0) {
            result.push(currentValue);
        }
        else {
            const prevEMA = result[i - 1];
            if (prevEMA === undefined || isNaN(prevEMA)) {
                result.push(currentValue);
            }
            else {
                const ema = (currentValue * alpha) + (prevEMA * (1 - alpha));
                result.push(ema);
            }
        }
    }
    return result;
}
/**
 * Calculate Weighted Moving Average (WMA)
 *
 * Uses weighted average with decreasing weights.
 *
 * @param data - Source data array
 * @param length - WMA period
 * @returns Array of WMA values
 */
function weightedMovingAverage(data, length) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < length - 1) {
            result.push(NaN);
            continue;
        }
        let weightedSum = 0;
        let weightSum = 0;
        for (let j = 0; j < length; j++) {
            const weight = j + 1;
            const value = data[i - j];
            if (value !== undefined && !isNaN(value)) {
                weightedSum += value * weight;
                weightSum += weight;
            }
        }
        result.push(weightSum > 0 ? weightedSum / weightSum : NaN);
    }
    return result;
}
/**
 * Calculate Hull Moving Average (HMA)
 *
 * Uses Hull's algorithm for reduced lag while maintaining smoothness.
 *
 * @param data - Source data array
 * @param length - HMA period
 * @returns Array of HMA values
 */
function hullMovingAverage(data, length) {
    const halfLength = Math.floor(length / 2);
    const sqrtLength = Math.floor(Math.sqrt(length));
    // Calculate WMA(n/2)
    const wmaHalf = weightedMovingAverage(data, halfLength);
    // Calculate WMA(n)
    const wmaFull = weightedMovingAverage(data, length);
    // Calculate raw HMA: 2 * WMA(n/2) - WMA(n)
    const rawHMA = [];
    const minLength = Math.min(wmaHalf.length, wmaFull.length);
    for (let i = 0; i < minLength; i++) {
        const halfValue = wmaHalf[i];
        const fullValue = wmaFull[i];
        if (halfValue !== undefined && fullValue !== undefined && !isNaN(halfValue) && !isNaN(fullValue)) {
            rawHMA.push(2 * halfValue - fullValue);
        }
        else {
            rawHMA.push(NaN);
        }
    }
    // Calculate final HMA using WMA with sqrt(n) period
    return weightedMovingAverage(rawHMA, sqrtLength);
}
/**
 * Factory function for creating moving averages (legacy support)
 *
 * @param type - Moving average type
 * @returns Function that calculates the specified moving average
 */
export function createMovingAverage(type) {
    return (data, length) => movingAverage(data, length, type);
}
//# sourceMappingURL=index.js.map