import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculateVWMA } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Volume Weighted Moving Average (VWMA)
 *
 * VWMA = Σ(Price × Volume) / Σ(Volume) for the specified period
 * Uses centralized calculation utilities for consistency.
 *
 * @param data - Market data with OHLCV
 * @param length - Moving average period (default: 20)
 * @returns VWMA values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateVWMAIndicator(data, length = 20) {
    if (Array.isArray(data)) {
        throw new Error('Market data required for VWMA calculation');
    }
    validateVolumeData(data);
    return calculateVWMA(data.close, data.volume, length);
}
const VWMAIndicator = createVolumeIndicator('VWMA', 'Volume Weighted Moving Average', calculateVWMAIndicator, DEFAULT_LENGTHS.SMA);
/**
 * Calculate VWMA values using wrapper function
 *
 * @param data - Market data
 * @param length - Moving average period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns VWMA values array
 */
export function vwma(data, length, source) {
    return createIndicatorWrapper(VWMAIndicator, data, length, source);
}
