import { BaseIndicator } from '@base/base-indicator';
import { calculateKAMA } from '@utils/calculations/moving-averages';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Kaufman Adaptive Moving Average (KAMA) indicator
 *
 * KAMA adapts to market conditions by adjusting its smoothing factor.
 * It's more responsive in trending markets and smoother in sideways markets.
 */
export class KAMA extends BaseIndicator {
    constructor() {
        super('KAMA', 'Kaufman Adaptive Moving Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || 10, 10);
        const fastPeriod = config?.['fastPeriod'] || 2;
        const slowPeriod = config?.['slowPeriod'] || 30;
        const values = calculateKAMA(source, length, fastPeriod, slowPeriod);
        return {
            values,
            metadata: {
                length,
                fastPeriod,
                slowPeriod,
                source: config?.source || 'close'
            }
        };
    }
}
const KAMA_INDICATOR = new KAMA();
/**
 * Calculate KAMA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - KAMA period (default: 10)
 * @param fastPeriod - Fast EMA period (default: 2)
 * @param slowPeriod - Slow EMA period (default: 30)
 * @param source - Price source (default: 'close')
 * @returns KAMA values array
 */
export function kama(data, length, fastPeriod, slowPeriod, source) {
    const config = {
        length: length || 10,
        fastPeriod: fastPeriod || 2,
        slowPeriod: slowPeriod || 30,
        source: source || 'close'
    };
    return KAMA_INDICATOR.calculate(data, config).values;
}
