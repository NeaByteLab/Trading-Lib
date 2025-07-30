import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { ArrayUtils } from '@utils/array-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * MACD (Moving Average Convergence Divergence) indicator
 *
 * Calculates MACD line, signal line, and histogram using exponential moving averages.
 * MACD = Fast EMA - Slow EMA, Signal = EMA of MACD, Histogram = MACD - Signal
 *
 * @example
 * ```typescript
 * const macd = new MACD()
 * const result = macd.calculate(marketData, { fastLength: 12, slowLength: 26, signalLength: 9 })
 * console.log(result.values) // MACD line values
 * console.log(result.metadata.signal) // Signal line values
 * console.log(result.metadata.histogram) // Histogram values
 * ```
 */
export class MACD extends BaseIndicator {
    constructor() {
        super('MACD', 'Moving Average Convergence Divergence', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const fastLength = pineLength(config?.['fastLength'] || 12, 12);
        const slowLength = pineLength(config?.['slowLength'] || 26, 26);
        const signalLength = pineLength(config?.['signalLength'] || 9, 9);
        const { macd, signal, histogram } = this.calculateMACD(source, fastLength, slowLength, signalLength);
        return {
            values: macd,
            metadata: {
                length: fastLength,
                fastLength,
                slowLength,
                signalLength,
                source: config?.source || 'close',
                signal,
                histogram
            }
        };
    }
    calculateMACD(data, fastLength, slowLength, signalLength) {
        const fastEMA = movingAverage(data, fastLength, 'ema');
        const slowEMA = movingAverage(data, slowLength, 'ema');
        const macd = ArrayUtils.processArray(fastEMA, (fast, i) => {
            const slow = slowEMA[i];
            if (fast === undefined || slow === undefined || isNaN(fast) || isNaN(slow)) {
                return NaN;
            }
            return fast - slow;
        });
        const signal = movingAverage(macd, signalLength, 'ema');
        const histogram = ArrayUtils.processArray(macd, (macdVal, i) => {
            const signalVal = signal[i];
            if (macdVal === undefined || signalVal === undefined || isNaN(macdVal) || isNaN(signalVal)) {
                return NaN;
            }
            return macdVal - signalVal;
        });
        return { macd, signal, histogram };
    }
}
/**
 * Calculate MACD values using wrapper function
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal EMA period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns Object with macd, signal, and histogram arrays
 */
export function macd(data, fastLength, slowLength, signalLength, source) {
    const result = createMultiResultIndicatorWrapper(MACD, data, fastLength, source, { slowLength, signalLength });
    return {
        macd: result.values,
        signal: result.metadata['signal'],
        histogram: result.metadata['histogram']
    };
}
