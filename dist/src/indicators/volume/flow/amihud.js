import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { MathUtils } from '@utils/math-utils';
import { validateIndicatorData } from '@utils/validation-utils';
/**
 * Calculate Amihud Illiquidity Measure
 *
 * Amihud = |Return| / Volume
 * Return = (Close - Previous Close) / Previous Close
 *
 * @param data - Market data with high, low, close, volume arrays
 * @param length - Calculation period (default: 20)
 * @returns Amihud Illiquidity values array
 */
function calculateAmihudIlliquidity(data, _length = 20) {
    // Handle both MarketData and number array inputs
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    // Validate market data structure
    validateIndicatorData(data);
    // Additional validation for volume data
    if (!data.volume) {
        throw new Error(ERROR_MESSAGES.MISSING_VOLUME);
    }
    if (!data.close || data.close.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (data.close.length !== data.volume.length) {
        throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH);
    }
    return ArrayUtils.processArray(data.close, (close, i) => {
        if (i === 0) {
            return NaN;
        }
        const previousClose = data.close[i - 1];
        const volume = data.volume[i];
        if (previousClose === 0 || volume === 0) {
            return NaN;
        }
        const returnValue = (close - previousClose) / previousClose;
        return MathUtils.abs(returnValue) / volume;
    });
}
const AmihudIlliquidity = createVolumeIndicator('Amihud Illiquidity', 'Amihud Illiquidity Measure', calculateAmihudIlliquidity, 20);
/**
 * Calculate Amihud Illiquidity Measure
 *
 * @param data - Market data with high, low, close, volume arrays
 * @param length - Calculation period (default: 20)
 * @returns Amihud Illiquidity values array
 */
export function amihudIlliquidity(data, length = 20) {
    return createIndicatorWrapper(AmihudIlliquidity, data, length);
}
