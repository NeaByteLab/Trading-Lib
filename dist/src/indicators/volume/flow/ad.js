import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateIndicatorData } from '@utils/validation-utils';
/**
 * Calculate Accumulation Distribution Line
 *
 * AD = Previous AD + Money Flow Multiplier * Volume
 * Money Flow Multiplier = ((Close - Low) - (High - Close)) / (High - Low)
 *
 * @param data - Market data with high, low, close, volume arrays
 * @returns Accumulation Distribution values array
 */
function calculateAccumulationDistribution(data, _length = 1) {
    // Handle both MarketData and number array inputs
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    // Additional validation for required fields
    if (!data.high || !data.low || !data.close) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    if (!data.volume || data.volume.length === 0) {
        throw new Error(ERROR_MESSAGES.MISSING_VOLUME);
    }
    // Validate market data structure
    validateIndicatorData(data);
    // Validate data lengths match
    const lengths = [data.high.length, data.low.length, data.close.length, data.volume.length];
    if (lengths.some(len => len === 0)) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (!lengths.every(len => len === lengths[0])) {
        throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH);
    }
    let previousAD = 0;
    return ArrayUtils.processArray(data.close, (close, i) => {
        const high = data.high[i];
        const low = data.low[i];
        const volume = data.volume[i];
        const range = high - low;
        if (range === 0) {
            return previousAD;
        }
        const moneyFlowMultiplier = ((close - low) - (high - close)) / range;
        const moneyFlowVolume = moneyFlowMultiplier * volume;
        previousAD += moneyFlowVolume;
        return previousAD;
    });
}
const AccumulationDistribution = createVolumeIndicator('Accumulation Distribution', 'Accumulation Distribution Line', calculateAccumulationDistribution, 1);
/**
 * Calculate Accumulation Distribution Line
 *
 * @param data - Market data with high, low, close, volume arrays
 * @returns Accumulation Distribution values array
 */
export function accumulationDistribution(data) {
    return createIndicatorWrapper(AccumulationDistribution, data);
}
