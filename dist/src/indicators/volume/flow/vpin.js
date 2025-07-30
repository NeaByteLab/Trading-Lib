import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { calculateVPIN } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate VPIN (Volume-synchronized Probability of Informed Trading)
 *
 * VPIN = |Buy Volume - Sell Volume| / Total Volume
 * Uses volume imbalance to detect informed trading
 * Based on Easley, O'Hara, and Yang (2012) methodology
 *
 * @param data - Market data with OHLCV
 * @param length - Calculation period (default: 50)
 * @param buckets - Number of volume buckets (default: 50)
 * @returns VPIN values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateVPINIndicator(data, length = 50, buckets = 50) {
    if (Array.isArray(data)) {
        throw new Error('Market data required for VPIN calculation');
    }
    validateVolumeData(data);
    return calculateVPIN(data.close, data.volume, length, buckets);
}
const VPINIndicator = createVolumeIndicator('VPIN', 'Volume-synchronized Probability of Informed Trading', calculateVPINIndicator, 50);
/**
 * Calculate VPIN values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 50)
 * @param buckets - Number of volume buckets (default: 50)
 * @param source - Price source (default: 'volume')
 * @returns VPIN values array
 */
export function vpin(data, length, buckets, source) {
    return createIndicatorWrapper(VPINIndicator, data, length, source, { buckets });
}
