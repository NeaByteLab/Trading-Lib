import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { calculateVIDYA } from '@utils/calculation-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Variable Index Dynamic Average (VIDYA) indicator
 *
 * VIDYA adapts to market volatility by adjusting its smoothing factor.
 * Formula: VIDYA = Price × α + Previous VIDYA × (1 - α)
 * where α = 2 / (Length + 1) × (1 + CMO)
 *
 * @example
 * ```typescript
 * const vidya = new VIDYA()
 * const result = vidya.calculate(marketData, { length: 14, cmoLength: 9 })
 * console.log(result.values) // VIDYA values
 * ```
 */
export class VIDYA extends BaseIndicator {
    constructor() {
        super('VIDYA', 'Variable Index Dynamic Average', 'trend');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.EMA, DEFAULT_LENGTHS.EMA);
        const cmoLength = config?.['cmoLength'] || 9;
        const values = calculateVIDYA(source, length, cmoLength);
        return {
            values,
            metadata: {
                length,
                cmoLength,
                source: config?.source || 'close'
            }
        };
    }
}
const VIDYA_INDICATOR = new VIDYA();
/**
 * Calculate VIDYA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - VIDYA period (default: 14)
 * @param cmoLength - CMO calculation period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns VIDYA values array
 */
export function vidya(data, length, cmoLength, source) {
    const config = {
        length: length || DEFAULT_LENGTHS.EMA,
        cmoLength: cmoLength || 9,
        source: source || 'close'
    };
    return VIDYA_INDICATOR.calculate(data, config).values;
}
