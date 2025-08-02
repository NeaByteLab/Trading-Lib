import { OscillatorIndicator } from '@core/base/oscillator-indicator';
import { ArrayUtils } from '@core/utils/array-utils';
import { createIndicatorWrapper } from '@core/utils/indicator-utils';
import { MathUtils } from '@core/utils/math-utils';
/**
 * Fisher Transform Indicator
 * Transforms price data to make it more Gaussian distributed for better signal detection
 */
export class FisherTransformIndicator extends OscillatorIndicator {
    constructor() {
        super('FisherTransform', 'Fisher Transform', 10, 1);
    }
    calculateOscillator(data, length) {
        return ArrayUtils.processWindow(data, length, (window) => {
            const validData = window.filter(val => !isNaN(val) && isFinite(val));
            if (validData.length < 2) {
                return NaN;
            }
            const max = MathUtils.max(validData);
            const min = MathUtils.min(validData);
            const range = max - min;
            if (range === 0) {
                return NaN;
            }
            const currentPrice = validData[validData.length - 1];
            const normalizedPrice = (currentPrice - min) / range;
            // Fisher Transform formula: 0.5 * ln((1 + x) / (1 - x))
            const fisherValue = 0.5 * Math.log((1 + normalizedPrice) / (1 - normalizedPrice));
            return isFinite(fisherValue) ? fisherValue : NaN;
        });
    }
}
/**
 * Calculate Fisher Transform
 * @param data - Market data or price array
 * @param length - Period for calculation (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Fisher Transform values
 */
export function fisherTransform(data, length, source) {
    return createIndicatorWrapper(FisherTransformIndicator, data, length, source);
}
