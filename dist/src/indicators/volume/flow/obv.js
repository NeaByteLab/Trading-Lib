import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Calculate OBV using centralized utilities
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 1)
 * @returns OBV values array
 */
function calculateOBV(data, _length = 1) {
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    if (!data.volume) {
        throw new Error(ERROR_MESSAGES.MISSING_VOLUME);
    }
    let obv = 0;
    return ArrayUtils.processArray(data.close, (close, i) => {
        if (i === 0) {
            obv = data.volume[i];
            return obv;
        }
        const currentClose = close;
        const previousClose = data.close[i - 1];
        const currentVolume = data.volume[i];
        if (isNaN(currentClose) || isNaN(previousClose) || isNaN(currentVolume)) {
            return NaN;
        }
        if (currentClose > previousClose) {
            obv += currentVolume;
        }
        else if (currentClose < previousClose) {
            obv -= currentVolume;
        }
        return obv;
    });
}
const OBV = createVolumeIndicator('OBV', 'On Balance Volume', calculateOBV, 1);
/**
 * Calculate OBV values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 1)
 * @param source - Price source (default: 'close')
 * @returns OBV values array
 */
export function obv(data, length, source) {
    return createIndicatorWrapper(OBV, data, length, source);
}
