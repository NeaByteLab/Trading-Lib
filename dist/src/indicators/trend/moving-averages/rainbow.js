import { BaseIndicator } from '@core/base/base-indicator';
import { ArrayUtils } from '@core/utils/array-utils';
import { pineSource } from '@core/utils/pine-script-utils';
/**
 * Rainbow 3D Moving Averages
 *
 * Calculates a set of moving averages with different periods to form a "rainbow" overlay.
 * Useful for visualizing trend strength and direction.
 *
 * @param data - Array of prices or MarketData
 * @param periods - Array of periods for each band (default: [2,3,4,5,6,7,8,9,10])
 * @param source - Price source (default: 'close')
 * @returns Array of arrays, each representing a moving average band
 *
 * @example
 * ```typescript
 * const bands = rainbow(data, [2,3,4,5,6,7,8,9,10])
 * // bands[0] = MA(period=2), bands[1] = MA(period=3), ...
 * ```
 */
export class RainbowIndicator extends BaseIndicator {
    constructor() {
        super('Rainbow', 'Rainbow 3D Moving Averages', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const periods = config?.periods || [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const bands = periods.map(period => ArrayUtils.rollingStatistic(source, period, 'mean'));
        const lastBand = bands[bands.length - 1];
        return {
            values: lastBand || [],
            metadata: {
                length: Math.max(...periods),
                source: config?.source || 'close',
                bands: bands
            }
        };
    }
}
export function rainbow(data, periods, source) {
    const indicator = new RainbowIndicator();
    const config = {};
    if (periods !== undefined) {
        config.periods = periods;
    }
    if (source !== undefined) {
        config.source = source;
    }
    const result = indicator.calculate(data, config);
    return result.metadata['bands'];
}
