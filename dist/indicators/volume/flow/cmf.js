import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Chaikin Money Flow (CMF) indicator
 *
 * CMF measures buying and selling pressure using volume and price data.
 * Formula: CMF = Sum(Money Flow Volume) / Sum(Volume) over period
 *
 * @example
 * ```typescript
 * const cmf = new CMF()
 * const result = cmf.calculate(marketData, { length: 20 })
 * console.log(result.values) // CMF values
 * ```
 */
export class CMF extends BaseIndicator {
    constructor() {
        super('CMF', 'Chaikin Money Flow', 'volume');
    }
    /**
     * Calculate CMF values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns CMF calculation result
     */
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error('CMF requires OHLCV market data');
        }
        if (!data.volume) {
            throw new Error('Volume data is required for CMF calculation');
        }
        const length = pineLength(config?.length || DEFAULT_LENGTHS.CMF, DEFAULT_LENGTHS.CMF);
        const values = this.calculateCMF(data, length);
        return {
            values,
            metadata: {
                length,
                source: 'hlc3'
            }
        };
    }
    /**
     * Calculate CMF values
     *
     * @param data - Market data
     * @param length - Calculation period
     * @returns CMF values array
     */
    calculateCMF(data, length) {
        const result = [];
        for (let i = 0; i < data.close.length; i++) {
            if (i < length - 1) {
                result.push(NaN);
                continue;
            }
            let moneyFlowVolume = 0;
            let totalVolume = 0;
            for (let j = i - length + 1; j <= i; j++) {
                const high = data.high[j];
                const low = data.low[j];
                const close = data.close[j];
                const volume = data.volume[j];
                const moneyFlowMultiplier = ((close - low) - (high - close)) / (high - low);
                const currentMoneyFlowVolume = moneyFlowMultiplier * volume;
                moneyFlowVolume += currentMoneyFlowVolume;
                totalVolume += volume;
            }
            const cmf = totalVolume > 0 ? moneyFlowVolume / totalVolume : 0;
            result.push(cmf);
        }
        return result;
    }
}
/**
 * Calculate CMF values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CMF values array
 */
export function cmf(data, length, source) {
    return createIndicatorWrapper(CMF, data, length, source);
}
//# sourceMappingURL=cmf.js.map