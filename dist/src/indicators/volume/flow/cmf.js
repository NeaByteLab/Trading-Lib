import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS, ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * CMF (Chaikin Money Flow) indicator
 *
 * A volume-based indicator that measures buying and selling pressure.
 * Formula: CMF = Σ(Money Flow Volume) / Σ(Volume) over period
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
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
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
    calculateCMF(data, length) {
        const moneyFlowMultiplier = ArrayUtils.processArray(data.high, (_, i) => {
            const high = data.high[i];
            const low = data.low[i];
            const close = data.close[i];
            const volume = data.volume?.[i] || 0;
            if (isNaN(high) || isNaN(low) || isNaN(close) || volume === 0) {
                return 0;
            }
            const range = high - low;
            if (range === 0) {
                return 0;
            }
            const moneyFlowMultiplier = ((close - low) - (high - close)) / range;
            return moneyFlowMultiplier * volume;
        });
        return ArrayUtils.processWindow(moneyFlowMultiplier, length, (window, windowIndex) => {
            const validValues = window.filter(val => !isNaN(val) && val !== 0);
            if (validValues.length === 0) {
                return NaN;
            }
            const cumulativeMFV = MathUtils.sum(validValues);
            const startIndex = MathUtils.max([0, windowIndex - length + 1]);
            const endIndex = windowIndex + 1;
            const volumeSlice = data.volume?.slice(startIndex, endIndex) || [];
            const cumulativeVolume = MathUtils.sum(volumeSlice);
            return cumulativeVolume === 0 ? 0 : cumulativeMFV / cumulativeVolume;
        });
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
