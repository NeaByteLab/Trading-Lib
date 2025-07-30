import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { calculateCCI } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Commodity Channel Index (CCI) indicator
 *
 * CCI measures the current price level relative to an average price level over a given period.
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @example
 * ```typescript
 * const cci = new CCI()
 * const result = cci.calculate(marketData, { length: 20 })
 * console.log(result.values) // CCI values
 * ```
 */
export class CCI extends BaseIndicator {
    constructor() {
        super('CCI', 'Commodity Channel Index', 'momentum');
    }
    /**
     * Calculate CCI values
     *
     * @param data - Market data or price array
     * @param config - Indicator configuration
     * @returns CCI calculation result
     */
    calculate(data, config) {
        this.validateInput(data, config);
        // CCI requires OHLC data for typical price calculation
        if (Array.isArray(data)) {
            throw new Error('CCI requires OHLC market data for typical price calculation');
        }
        const typicalPrices = this.getSourceData(data, 'hlc3');
        const length = pineLength(config?.length || DEFAULT_LENGTHS.CCI, DEFAULT_LENGTHS.CCI);
        const values = calculateCCI(typicalPrices, length);
        return {
            values,
            metadata: {
                length,
                source: 'hlc3'
            }
        };
    }
}
/**
 * Calculate CCI values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CCI values array
 */
export function cci(data, length, source) {
    return createIndicatorWrapper(CCI, data, length, source);
}
//# sourceMappingURL=cci.js.map