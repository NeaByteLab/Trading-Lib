import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@core/utils/array-utils';
import { movingAverage } from '@core/utils/calculations/moving-averages';
import { MathUtils } from '@core/utils/math-utils';
/**
 * Calculate Momentum using centralized utilities
 *
 * @param data - Source data array
 * @param length - Lookback period
 * @returns Momentum values array
 */
export function calculateMomentum(data, length) {
    return ArrayUtils.processArray(data, (current, i) => {
        if (i < length) {
            return NaN;
        }
        const previous = data[i - length];
        return current - previous;
    });
}
/**
 * Calculate Rate of Change (ROC) using centralized utilities
 *
 * @param data - Source data array
 * @param length - Lookback period
 * @returns ROC values array
 */
export function calculateROC(data, length) {
    return ArrayUtils.processArray(data, (current, i) => {
        if (i < length) {
            return NaN;
        }
        const previous = data[i - length];
        if (previous === 0) {
            return NaN;
        }
        return ((current - previous) / previous) * 100;
    });
}
/**
 * Calculate Percentage Price Oscillator (PPO) using centralized utilities
 *
 * @param data - Source data array
 * @param fastLength - Fast EMA period
 * @param slowLength - Slow EMA period
 * @returns PPO values array
 */
export function calculatePPO(data, fastLength, slowLength) {
    if (fastLength >= slowLength) {
        throw new Error(ERROR_MESSAGES.FAST_LENGTH_GREATER);
    }
    const fastEMA = movingAverage(data, fastLength, 'ema');
    const slowEMA = movingAverage(data, slowLength, 'ema');
    // Ensure both arrays have the same length by aligning them
    const minLength = Math.min(fastEMA.length, slowEMA.length);
    const alignedFastEMA = fastEMA.slice(-minLength);
    const alignedSlowEMA = slowEMA.slice(-minLength);
    return ArrayUtils.processArray(alignedFastEMA, (fast, i) => {
        const slow = alignedSlowEMA[i];
        if (fast === undefined || slow === undefined || isNaN(fast) || isNaN(slow)) {
            return NaN;
        }
        if (slow === 0) {
            return NaN;
        }
        return ((fast - slow) / slow) * 100;
    });
}
/**
 * Calculate TRIX oscillator values
 *
 * TRIX is a momentum oscillator that shows the percentage rate of change of a triple exponentially smoothed moving average.
 * Formula: TRIX = 100 * (EMA3 - EMA3[1]) / EMA3[1]
 *
 * @param data - Price array
 * @param length - Calculation period (default: 18)
 * @returns TRIX values array
 */
export function calculateTRIX(data, length = 18) {
    if (data.length === 0) {
        return [];
    }
    const ema1 = movingAverage(data, length, 'ema');
    const ema2 = movingAverage(ema1, length, 'ema');
    const ema3 = movingAverage(ema2, length, 'ema');
    return ArrayUtils.processArray(ema3, (current, i) => {
        if (i === 0) {
            return NaN;
        }
        const previous = ema3[i - 1];
        if (previous === undefined || isNaN(previous) || previous === 0) {
            return NaN;
        }
        const result = 100 * (current - previous) / previous;
        return isFinite(result) ? result : NaN;
    });
}
/**
 * Calculate True Strength Index (TSI) oscillator values
 *
 * TSI is a momentum oscillator that shows both trend direction and overbought/oversold conditions.
 * Formula: TSI = 100 * (PC / APC) where PC = EMA(EMA(price - price[1])) and APC = EMA(EMA(abs(price - price[1])))
 *
 * @param data - Price array
 * @param firstLength - First smoothing period (default: 25)
 * @param secondLength - Second smoothing period (default: 13)
 * @returns TSI values array
 */
export function calculateTSI(data, firstLength = 25, secondLength = 13) {
    if (data.length === 0) {
        return [];
    }
    // Calculate price changes
    const priceChanges = ArrayUtils.processArray(data, (price, i) => {
        if (i === 0) {
            return 0;
        }
        const previous = data[i - 1];
        if (previous === undefined) {
            return 0;
        }
        return price - previous;
    });
    const absPriceChanges = ArrayUtils.processArray(priceChanges, change => Math.abs(change));
    // Apply first EMA smoothing
    const pcFirstEMA = movingAverage(priceChanges, firstLength, 'ema');
    const apcFirstEMA = movingAverage(absPriceChanges, firstLength, 'ema');
    // Filter out NaN values before second EMA
    const validPCFirstEMA = pcFirstEMA.filter(val => !isNaN(val) && isFinite(val));
    const validAPCFirstEMA = apcFirstEMA.filter(val => !isNaN(val) && isFinite(val));
    if (validPCFirstEMA.length === 0 || validAPCFirstEMA.length === 0) {
        return Array(data.length).fill(NaN);
    }
    // Apply second EMA smoothing on valid data
    const pc = movingAverage(validPCFirstEMA, secondLength, 'ema');
    const apc = movingAverage(validAPCFirstEMA, secondLength, 'ema');
    // Find the minimum length among the result arrays
    const minLength = Math.min(pc.length, apc.length);
    // Use the last minLength elements from each array
    const alignedPC = pc.slice(-minLength);
    const alignedAPC = apc.slice(-minLength);
    // Calculate TSI with proper alignment
    const result = ArrayUtils.processArray(alignedPC, (pcVal, i) => {
        const apcVal = alignedAPC[i];
        if (pcVal === undefined || apcVal === undefined || isNaN(pcVal) || isNaN(apcVal) || apcVal === 0) {
            return NaN;
        }
        const tsiValue = 100 * (pcVal / apcVal);
        return isFinite(tsiValue) ? tsiValue : NaN;
    });
    // Pad the result to match the original data length
    const padding = data.length - result.length;
    return Array(padding).fill(NaN).concat(result);
}
/**
 * Calculate Twiggs Momentum oscillator values
 *
 * Twiggs Momentum is a trend-following indicator that measures the rate of change in price.
 * Formula: TM = EMA(price - price[n]) where n is the lookback period
 * Uses exponential smoothing to reduce noise and identify trend direction.
 *
 * @param data - Price array
 * @param length - Calculation period (default: 20)
 * @param lookback - Lookback period (default: 10)
 * @returns Twiggs Momentum values array
 */
export function calculateTwiggsMomentum(data, length = 20, lookback = 10) {
    if (data.length === 0) {
        return [];
    }
    const momentum = ArrayUtils.processArray(data, (price, i) => {
        if (i < lookback) {
            return NaN;
        }
        const previous = data[i - lookback];
        if (previous === undefined) {
            return NaN;
        }
        return price - previous;
    });
    return movingAverage(momentum, length, 'ema');
}
/**
 * Calculate EMA difference (Fast EMA - Slow EMA)
 *
 * @param data - Source data array
 * @param fastLength - Fast EMA period
 * @param slowLength - Slow EMA period
 * @returns EMA difference values array
 */
export function calculateEMADifference(data, fastLength, slowLength) {
    if (!data || data.length === 0) {
        return [];
    }
    if (fastLength >= slowLength) {
        throw new Error(ERROR_MESSAGES.FAST_LENGTH_GREATER);
    }
    const fastEMA = movingAverage(data, fastLength, 'ema');
    const slowEMA = movingAverage(data, slowLength, 'ema');
    return ArrayUtils.processArray(fastEMA, (fast, i) => {
        const slow = slowEMA[i];
        return fast !== undefined && slow !== undefined && !isNaN(fast) && !isNaN(slow) ? fast - slow : NaN;
    });
}
/**
 * Calculate log returns from price data
 *
 * @param prices - Array of prices
 * @returns Array of log returns
 */
export function calculateLogReturns(prices) {
    return ArrayUtils.processArray(prices.slice(1), (currentPrice, i) => {
        const previousPrice = prices[i];
        if (isNaN(currentPrice) || isNaN(previousPrice) || previousPrice <= 0) {
            return NaN;
        }
        return MathUtils.log(currentPrice / previousPrice);
    });
}
