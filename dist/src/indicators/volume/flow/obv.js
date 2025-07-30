import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculateOBV } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate OBV using centralized utilities
 *
 * @param data - Market data or price array
 * @param _length - Unused parameter for factory compatibility
 * @returns OBV values array
 */
function calculateOBVWrapper(data, _length = 1) {
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    validateVolumeData(data);
    return calculateOBV(data.close, data.volume);
}
const OBV = createVolumeIndicator('OBV', 'On Balance Volume', calculateOBVWrapper, 1);
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
