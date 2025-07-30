import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculatePriceVolumeTrend } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Price Volume Trend (PVT) using centralized utilities
 *
 * PVT measures cumulative volume-weighted price change.
 * It helps identify buying and selling pressure over time.
 *
 * @param data - Market data with OHLCV values
 * @param _length - Unused parameter for factory compatibility
 * @returns Array of PVT values
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculatePriceVolumeTrendWrapper(data, _length = 1) {
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    validateVolumeData(data);
    return calculatePriceVolumeTrend(data.close, data.volume);
}
const PriceVolumeTrend = createVolumeIndicator('Price Volume Trend', 'Cumulative volume-weighted price change', calculatePriceVolumeTrendWrapper, 1);
/**
 * Calculate Price Volume Trend (PVT)
 *
 * @param data - Market data with OHLCV values
 * @returns Array of PVT values
 */
export function priceVolumeTrend(data) {
    return createIndicatorWrapper(PriceVolumeTrend, data);
}
