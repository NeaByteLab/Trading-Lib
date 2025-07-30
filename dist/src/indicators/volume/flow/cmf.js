import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { ArrayUtils } from '@utils/array-utils';
import { calculateCumulativeVolume, calculateMoneyFlowMultiplier, filterValidValues } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Chaikin Money Flow (CMF)
 *
 * A volume-based indicator that measures buying and selling pressure.
 * Formula: CMF = Σ(Money Flow Volume) / Σ(Volume) over period
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @returns CMF values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateCMF(data, length = 20) {
    if (Array.isArray(data)) {
        throw new Error('Market data required for CMF calculation');
    }
    validateVolumeData(data);
    const moneyFlowValues = ArrayUtils.processArray(data.close, (close, i) => {
        const high = data.high[i];
        const low = data.low[i];
        const volume = data.volume[i] || 0;
        if (isNaN(high) || isNaN(low) || isNaN(close) || volume === 0) {
            return 0;
        }
        const moneyFlowMultiplier = calculateMoneyFlowMultiplier(high, low, close);
        return moneyFlowMultiplier * volume;
    });
    return ArrayUtils.processWindow(moneyFlowValues, length, (window, windowIndex) => {
        const validValues = filterValidValues(window);
        if (validValues.length === 0) {
            return NaN;
        }
        const cumulativeMFV = MathUtils.sum(validValues);
        const startIndex = Math.max(0, windowIndex - length + 1);
        const endIndex = windowIndex + 1;
        const cumulativeVolume = calculateCumulativeVolume(data.volume, startIndex, endIndex);
        return cumulativeVolume === 0 ? 0 : cumulativeMFV / cumulativeVolume;
    });
}
const CMFIndicator = createVolumeIndicator('CMF', 'Chaikin Money Flow', calculateCMF, DEFAULT_LENGTHS.CMF);
/**
 * Calculate CMF values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CMF values array
 */
export function cmf(data, length, source) {
    return createIndicatorWrapper(CMFIndicator, data, length, source);
}
