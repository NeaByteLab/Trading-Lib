import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { PriceCalculations } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * VWAP (Volume Weighted Average Price) indicator
 *
 * Calculates the average price weighted by volume.
 * Formula: VWAP = Σ(Price × Volume) / Σ(Volume)
 *
 * @example
 * ```typescript
 * const vwap = new VWAP()
 * const result = vwap.calculate(marketData, { length: 20 })
 * console.log(result.values) // VWAP values
 * ```
 */
export class VWAP extends BaseIndicator {
    constructor() {
        super('VWAP', 'Volume Weighted Average Price', 'volume');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error('VWAP requires OHLC market data');
        }
        const length = pineLength(config?.length || DEFAULT_LENGTHS.VWAP, DEFAULT_LENGTHS.VWAP);
        const values = this.calculateVWAP(data, length);
        return {
            values,
            metadata: {
                length,
                source: 'hlc3'
            }
        };
    }
    calculateVWAP(data, length) {
        // Use centralized PriceCalculations utility instead of manual calculation
        const typicalPrices = PriceCalculations.typical(data);
        return ArrayUtils.processWindow(typicalPrices, length, (window, i) => {
            const validData = window.filter((_, j) => {
                const actualIndex = i - length + 1 + j;
                return !isNaN(window[j]) && data.volume?.[actualIndex] && data.volume[actualIndex] > 0;
            });
            if (validData.length === 0) {
                return NaN;
            }
            const tpvValues = validData.map((price, j) => {
                const actualIndex = i - length + 1 + j;
                return price * (data.volume?.[actualIndex] || 0);
            });
            const volumes = validData.map((_, j) => {
                const actualIndex = i - length + 1 + j;
                return data.volume?.[actualIndex] || 0;
            });
            const cumulativeTPV = MathUtils.sum(tpvValues);
            const cumulativeVolume = MathUtils.sum(volumes);
            return cumulativeVolume === 0 ? NaN : cumulativeTPV / cumulativeVolume;
        });
    }
}
/**
 * Calculate VWAP values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns VWAP values array
 */
export function vwap(data, length, source) {
    return createIndicatorWrapper(VWAP, data, length, source);
}
