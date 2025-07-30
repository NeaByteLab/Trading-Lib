import { BaseIndicator } from '@core/base/base-indicator';
import { DEFAULT_LENGTHS } from '@core/constants/indicator-constants';
import { ArrayUtils } from '@core/utils/array-utils';
import { calculateTrueRange, calculateWindowAverage } from '@core/utils/calculation-utils';
import { createIndicatorWrapper } from '@core/utils/indicator-utils';
import { pineLength } from '@core/utils/pine-script-utils';
/**
 * Twiggs Volatility Indicator
 *
 * A volatility indicator that measures the average true range over a specified period.
 * Uses exponential smoothing to reduce noise and identify volatility changes.
 *
 * @example
 * ```typescript
 * const twiggsVol = new TwiggsVolatility()
 * const result = twiggsVol.calculate(marketData, { length: 20 })
 * console.log(result.values) // Twiggs Volatility values
 * ```
 */
export class TwiggsVolatility extends BaseIndicator {
    constructor() {
        super('TwiggsVol', 'Twiggs Volatility', 'volatility');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.ATR, DEFAULT_LENGTHS.ATR);
        const _lookback = config?.['lookback'] || 10;
        const values = this.calculateTwiggsVolatility(data, length, _lookback);
        return {
            values,
            metadata: {
                length,
                lookback: _lookback,
                source: 'hlc3'
            }
        };
    }
    calculateTwiggsVolatility(data, length, _lookback) {
        const trueRanges = calculateTrueRange(data.high, data.low, data.close);
        return ArrayUtils.processWindow(trueRanges, length, (window) => {
            return calculateWindowAverage(window);
        });
    }
}
/**
 * Calculate Twiggs Volatility values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param lookback - Lookback period (default: 10)
 * @returns Twiggs Volatility values array
 */
export function twiggsVolatility(data, length, lookback) {
    return createIndicatorWrapper(TwiggsVolatility, data, length, undefined, { lookback });
}
