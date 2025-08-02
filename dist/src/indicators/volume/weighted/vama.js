import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculateVAMA } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Volume Adjusted Moving Average (VAMA)
 *
 * VAMA = Σ(Price × Volume) / Σ(Volume) for the specified period
 * Similar to VWMA but with additional volume filtering
 *
 * @param data - Market data with OHLCV
 * @param length - Moving average period (default: 20)
 * @param volumeThreshold - Minimum volume threshold (default: 0)
 * @returns VAMA values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateVAMAIndicator(data, length = 20, volumeThreshold = 0) {
    if (Array.isArray(data)) {
        throw new Error('Market data required for VAMA calculation');
    }
    validateVolumeData(data);
    return calculateVAMA(data.close, data.volume, length, volumeThreshold);
}
const VAMAIndicator = createVolumeIndicator('VAMA', 'Volume Adjusted Moving Average', calculateVAMAIndicator, DEFAULT_LENGTHS.SMA);
/**
 * Calculate Volume Adjusted Moving Average (VAMA)
 *
 * VAMA adjusts the moving average based on volume thresholds.
 * Formula: VAMA = Σ(Price × Volume) / Σ(Volume) where Volume > threshold
 * Filters out low-volume periods to focus on significant price movements.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @param volumeThreshold - Minimum volume threshold (default: 0)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of VAMA values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vama = ta.vama(marketData, 20, 1000)
 * // Returns: [100.5, 101.2, 102.1, 101.8, ...]
 * ```
 */
export function vama(data, length, volumeThreshold, source) {
    return createIndicatorWrapper(VAMAIndicator, data, length, source, { volumeThreshold });
}
