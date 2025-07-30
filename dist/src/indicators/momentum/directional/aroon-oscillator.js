import { BaseIndicator } from '@base/base-indicator';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Aroon Oscillator indicator
 *
 * Aroon Oscillator = Aroon Up - Aroon Down
 * Aroon Up = ((Period - Days Since High) / Period) × 100
 * Aroon Down = ((Period - Days Since Low) / Period) × 100
 *
 * @example
 * ```typescript
 * const aroon = new AroonOscillator()
 * const result = aroon.calculate(marketData, { length: 25 })
 * console.log(result.values) // Aroon Oscillator values
 * ```
 */
export class AroonOscillator extends BaseIndicator {
    constructor() {
        super('AroonOscillator', 'Aroon Oscillator', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || 25, 25);
        const values = this.calculateAroonOscillator(source, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
    calculateAroonOscillator(data, length) {
        return ArrayUtils.processWindow(data, length, (window, i) => {
            if (i < length - 1) {
                return NaN;
            }
            const highIndex = window.indexOf(MathUtils.max(window));
            const lowIndex = window.indexOf(MathUtils.min(window));
            const aroonUp = ((length - (length - 1 - highIndex)) / length) * 100;
            const aroonDown = ((length - (length - 1 - lowIndex)) / length) * 100;
            return aroonUp - aroonDown;
        });
    }
}
/**
 * Calculate Aroon Oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 25)
 * @param source - Price source (default: 'close')
 * @returns Aroon Oscillator values array
 */
export function aroonOscillator(data, length, source) {
    return createIndicatorWrapper(AroonOscillator, data, length, source);
}
