import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { wildersSmoothing } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Calculate Wilder's Smoothing
 *
 * @param data - Source data array
 * @param length - Smoothing period
 * @returns Smoothed values array
 */
function calculateWilders(data, length) {
    if (length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    return wildersSmoothing(data, length);
}
/**
 * Wilder's Smoothing indicator
 *
 * Applies Wilder's smoothing algorithm to price data.
 * Formula: Smoothed = Previous + (Current - Previous) / Length
 *
 * @example
 * ```typescript
 * const wilders = new WildersSmoothing()
 * const result = wilders.calculate(marketData, { length: 14 })
 * console.log(result.values) // Smoothed values
 * ```
 */
export class WildersSmoothing extends BaseIndicator {
    constructor() {
        super('WildersSmoothing', 'Wilder\'s Smoothing', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || 14, 14);
        const values = calculateWilders(source, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate Wilder's Smoothing using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Smoothing period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Smoothed values array
 */
export function wilders(data, length, source) {
    return createIndicatorWrapper(WildersSmoothing, data, length, source);
}
