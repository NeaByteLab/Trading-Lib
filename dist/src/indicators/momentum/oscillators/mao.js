import { movingAverage } from '@calculations/moving-averages';
import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Calculate Moving Average Oscillator
 *
 * @param data - Market data or price array
 * @param fastLength - Fast MA period (default: 10)
 * @param slowLength - Slow MA period (default: 20)
 * @param maType - Moving average type (default: 'sma')
 * @returns MAO values array
 */
function calculateMAO(data, fastLength = 10, slowLength = 20, maType = 'sma') {
    const fastMA = movingAverage(data, fastLength, maType);
    const slowMA = movingAverage(data, slowLength, maType);
    // Ensure both arrays have the same length by aligning them
    const minLength = Math.min(fastMA.length, slowMA.length);
    const alignedFastMA = fastMA.slice(-minLength);
    const alignedSlowMA = slowMA.slice(-minLength);
    return ArrayUtils.processArray(alignedFastMA, (fast, i) => {
        const slow = alignedSlowMA[i];
        if (fast === undefined || slow === undefined || isNaN(fast) || isNaN(slow)) {
            return NaN;
        }
        return fast - slow;
    });
}
const MAO = createOscillatorIndicator('MAO', 'Moving Average Oscillator', (data, length) => {
    return calculateMAO(data, length, 20, 'sma');
}, 10);
/**
 * Calculate Moving Average Oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param fastLength - Fast MA period (default: 10)
 * @param slowLength - Slow MA period (default: 20)
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns MAO values array
 */
export function movingAverageOscillator(data, fastLength, slowLength, maType, source) {
    return createIndicatorWrapper(MAO, data, fastLength, source, { slowLength, maType });
}
