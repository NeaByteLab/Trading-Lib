import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Momentum indicator
 *
 * A simple momentum oscillator that measures the rate of change in price.
 * Formula: Momentum = Current Price - Price n periods ago
 *
 * @example
 * ```typescript
 * const momentum = new Momentum()
 * const result = momentum.calculate(marketData, { length: 10 })
 * console.log(result.values) // Momentum values
 * ```
 */
export class Momentum extends BaseIndicator {
    constructor() {
        super('Momentum', 'Momentum', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.MOMENTUM, DEFAULT_LENGTHS.MOMENTUM);
        const values = this.calculateMomentum(source, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
    calculateMomentum(data, length) {
        return ArrayUtils.momentum(data, length);
    }
}
/**
 * Calculate Momentum values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Momentum values array
 */
export function momentum(data, length, source) {
    return createIndicatorWrapper(Momentum, data, length, source);
}
