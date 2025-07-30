import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { PriceCalculations } from '@utils/calculation-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Volume Weighted Average Price (VWAP)
 *
 * Uses centralized calculation utilities to ensure consistency and eliminate duplication.
 * Pine Script equivalent: vwap(hlc3)
 *
 * @param data - Market data with OHLCV values
 * @returns Array of VWAP values
 * @throws {Error} If volume data is missing or invalid market data
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104],
 *   volume: [1000, 1200, 1100, 1300, 1400]
 * }
 * const vwap = volumeWeightedAveragePrice(marketData)
 * console.log(vwap) // VWAP values
 * ```
 */
export function volumeWeightedAveragePrice(data) {
    validateVolumeData(data);
    if (!data.volume || data.volume.length === 0) {
        throw new Error(ERROR_MESSAGES.VOLUME_WEIGHTED_REQUIRED);
    }
    return ArrayUtils.processArray(data.close, (_, i) => {
        const volume = data.volume[i];
        if (volume === undefined || isNaN(volume)) {
            return NaN;
        }
        const typicalPrice = PriceCalculations.typical(data)[i];
        if (typicalPrice === undefined || isNaN(typicalPrice)) {
            return NaN;
        }
        return typicalPrice * volume;
    });
}
