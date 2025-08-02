import { BaseIndicator } from '@core/base/base-indicator';
import { wildersSmoothing } from '@core/utils/calculations/moving-averages';
import { pineSource } from '@core/utils/pine-script-utils';
/**
 * Rolling Moving Average (RMA)
 *
 * Calculates the rolling moving average (RMA), also known as Wilder's Smoothing.
 *
 * @param data - MarketData or price array
 * @param length - Period for the moving average (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Array of RMA values
 *
 * @example
 * ```typescript
 * const rma = rma(data, 14)
 * // rma[i] = RMA value at i
 * ```
 */
export class RMAIndicator extends BaseIndicator {
    constructor() {
        super('RMA', 'Rolling Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = config?.length || 14;
        const values = wildersSmoothing(source, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
export function rma(data, length, source) {
    const indicator = new RMAIndicator();
    const config = {};
    if (length !== undefined) {
        config.length = length;
    }
    if (source !== undefined) {
        config.source = source;
    }
    const result = indicator.calculate(data, config);
    return result.values;
}
