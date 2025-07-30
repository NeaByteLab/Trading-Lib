import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculateAmihudIlliquidity } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Amihud Illiquidity Measure using centralized utilities
 *
 * Amihud = |Return| / Volume
 * Return = (Close - Previous Close) / Previous Close
 *
 * @param data - Market data with high, low, close, volume arrays
 * @param _length - Unused parameter for factory compatibility
 * @returns Amihud Illiquidity values array
 * @throws {Error} If market data is invalid or missing required fields
 */
function calculateAmihudIlliquidityWrapper(data, _length = 20) {
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    validateVolumeData(data);
    return calculateAmihudIlliquidity(data.close, data.volume);
}
const AmihudIlliquidity = createVolumeIndicator('Amihud Illiquidity', 'Amihud Illiquidity Measure', calculateAmihudIlliquidityWrapper, 20);
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
