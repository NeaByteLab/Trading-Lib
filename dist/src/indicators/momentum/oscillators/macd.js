import { movingAverage } from '@calculations/moving-averages';
import { ArrayUtils } from '@utils/array-utils';
import { calculateEMADifference } from '@utils/calculation-utils';
/**
 * MACD (Moving Average Convergence Divergence) - trend-following momentum indicator
 * Formula: MACD = Fast EMA - Slow EMA, Signal = EMA(MACD), Histogram = MACD - Signal
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal line period (default: 9)
 * @returns Object with MACD, signal, and histogram values
 *
 * @example
 * ```typescript
 * const macd = ta.macd(data.close, 12, 26, 9)
 * // Returns: { macd: [...], signal: [...], histogram: [...] }
 * ```
 */
function calculateMACDWithSignal(data, fastLength = 12, slowLength = 26, signalLength = 9) {
    const macd = calculateEMADifference(data, fastLength, slowLength);
    // Filter out NaN values for signal calculation
    const validMacdValues = macd.filter(val => !isNaN(val) && isFinite(val));
    let signal;
    if (validMacdValues.length === 0) {
        signal = Array(macd.length).fill(NaN);
    }
    else {
        // Calculate EMA on valid values, then map back to original array
        const validSignal = movingAverage(validMacdValues, signalLength, 'ema');
        signal = Array(macd.length).fill(NaN);
        let validIndex = 0;
        for (let i = 0; i < macd.length; i++) {
            if (!isNaN(macd[i]) && isFinite(macd[i])) {
                if (validIndex < validSignal.length) {
                    signal[i] = validSignal[validIndex];
                }
                validIndex++;
            }
        }
    }
    const histogram = ArrayUtils.processArray(signal, (signalVal, i) => {
        const macdVal = macd[i];
        if (macdVal === undefined || signalVal === undefined || isNaN(macdVal) || isNaN(signalVal)) {
            return NaN;
        }
        return macdVal - signalVal;
    });
    return { macd, signal, histogram };
}
/**
 * MACD (Moving Average Convergence Divergence) - trend-following momentum indicator
 * Formula: MACD = Fast EMA - Slow EMA, Signal = EMA(MACD), Histogram = MACD - Signal
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal EMA period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns Object with macd, signal, and histogram arrays
 *
 * @example
 * ```typescript
 * const macd = ta.macd(data.close, 12, 26, 9)
 * // Returns: { macd: [...], signal: [...], histogram: [...] }
 * ```
 */
export function macd(data, fastLength, slowLength, signalLength, _source) {
    const sourceData = Array.isArray(data) ? data : data.close;
    return calculateMACDWithSignal(sourceData, fastLength || 12, slowLength || 26, signalLength || 9);
}
