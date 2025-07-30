import { OscillatorIndicator } from '@base/oscillator-indicator';
import { calculateShannonEntropy } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Shannon Entropy Indicator
 *
 * Calculates information entropy of price returns to measure market randomness.
 * Higher entropy indicates more random/unpredictable price movements.
 * Formula: H = -Σ(p(i) * log2(p(i))) where p(i) is probability of return in bin i
 *
 * @example
 * ```typescript
 * const shannon = new ShannonEntropyIndicator()
 * const result = shannon.calculate(marketData, { length: 20, bins: 8 })
 * console.log(result.values) // Entropy values
 * ```
 */
export class ShannonEntropyIndicator extends OscillatorIndicator {
    constructor() {
        super('ShannonEntropyIndicator', 'Shannon Entropy', 20, 1);
    }
    calculateOscillator(data, length) {
        const bins = 8;
        return calculateShannonEntropy(data, length, bins);
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || 20, 20);
        const bins = config?.['bins'] || 8;
        const values = calculateShannonEntropy(source, length, bins);
        return {
            values,
            metadata: {
                length,
                bins,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate Shannon Entropy using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param bins - Number of bins for discretization (default: 8)
 * @param source - Price source (default: 'close')
 * @returns Shannon entropy values array
 */
export function shannon(data, length, bins, source) {
    return createIndicatorWrapper(ShannonEntropyIndicator, data, length, source, { bins });
}
