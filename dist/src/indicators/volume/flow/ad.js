import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculateAccumulationDistribution } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Accumulation Distribution Line using centralized utilities
 *
 * AD = Previous AD + Money Flow Multiplier * Volume
 * Money Flow Multiplier = ((Close - Low) - (High - Close)) / (High - Low)
 *
 * @param data - Market data with high, low, close, volume arrays
 * @param _length - Unused parameter for factory compatibility
 * @returns Accumulation Distribution values array
 * @throws {Error} If market data is invalid or missing required fields
 */
function calculateAccumulationDistributionWrapper(data, _length = 1) {
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    validateVolumeData(data);
    return calculateAccumulationDistribution(data.high, data.low, data.close, data.volume);
}
const AccumulationDistribution = createVolumeIndicator('Accumulation Distribution', 'Accumulation Distribution Line', calculateAccumulationDistributionWrapper, 1);
/**
 * Calculate Accumulation Distribution Line
 *
 * @param data - Market data with high, low, close, volume arrays
 * @returns Accumulation Distribution values array
 */
export function accumulationDistribution(data) {
    return createIndicatorWrapper(AccumulationDistribution, data);
}
