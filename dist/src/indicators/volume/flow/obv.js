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
 * Calculate On Balance Volume (OBV)
 *
 * OBV measures buying and selling pressure by adding volume on up days and subtracting on down days.
 * Formula: OBV = Previous OBV + (Current Volume × Price Direction)
 * Price Direction = +1 if Close > Previous Close, -1 if Close < Previous Close, 0 if equal
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 1)
 * @param source - Price source (default: 'close')
 * @returns Array of OBV values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const obv = ta.obv(marketData)
 * // Returns: [1000000, 1050000, 1020000, 1080000, ...]
 * ```
 */
export function obv(data, length, source) {
    return createIndicatorWrapper(OBV, data, length, source);
}
