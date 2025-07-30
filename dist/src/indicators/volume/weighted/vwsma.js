import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculateVWSMA } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Volume Weighted Sine Moving Average (VWSMA)
 *
 * VWSMA = Σ(Price × Volume × Sine Weight) / Σ(Volume × Sine Weight)
 * Uses sine function to create smooth weighting
 *
 * @param data - Market data with OHLCV
 * @param length - Moving average period (default: 20)
 * @returns VWSMA values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateVWSMAIndicator(data, length = 20) {
    if (Array.isArray(data)) {
        throw new Error('Market data required for VWSMA calculation');
    }
    validateVolumeData(data);
    return calculateVWSMA(data.close, data.volume, length);
}
const VWSMAIndicator = createVolumeIndicator('VWSMA', 'Volume Weighted Sine Moving Average', calculateVWSMAIndicator, DEFAULT_LENGTHS.SMA);
/**
 * Calculate VWSMA values using wrapper function
 *
 * @param data - Market data
 * @param length - Moving average period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns VWSMA values array
 */
export function vwsma(data, length, source) {
    return createIndicatorWrapper(VWSMAIndicator, data, length, source);
}
