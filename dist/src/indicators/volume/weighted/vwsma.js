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
 * Calculate Volume Weighted Simple Moving Average (VWSMA)
 *
 * VWSMA is a simple moving average that weights prices by volume.
 * Formula: VWSMA = Σ(Price × Volume) / Σ(Volume) over period
 * Combines the simplicity of SMA with volume weighting.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of VWSMA values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vwsma = ta.vwsma(marketData, 20)
 * // Returns: [100.5, 101.2, 102.1, 101.8, ...]
 * ```
 */
export function vwsma(data, length, source) {
    return createIndicatorWrapper(VWSMAIndicator, data, length, source);
}
