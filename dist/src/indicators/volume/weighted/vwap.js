import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculateVWAP } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Volume Weighted Average Price (VWAP)
 *
 * VWAP = Σ(Price × Volume) / Σ(Volume)
 * Uses centralized calculation utilities for consistency.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @returns VWAP values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateVWAPIndicator(data, length = 20) {
    if (Array.isArray(data)) {
        throw new Error('Market data required for VWAP calculation');
    }
    validateVolumeData(data);
    return calculateVWAP(data, length);
}
const VWAPIndicator = createVolumeIndicator('VWAP', 'Volume Weighted Average Price', calculateVWAPIndicator, DEFAULT_LENGTHS.VWAP);
/**
 * Calculate VWAP values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns VWAP values array
 */
export function vwap(data, length, source) {
    return createIndicatorWrapper(VWAPIndicator, data, length, source);
}
