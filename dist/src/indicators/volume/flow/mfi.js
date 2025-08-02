import { moneyFlowIndex } from '@calculations/volume/money-flow';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Calculate MFI using centralized utilities
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @returns MFI values array
 */
function calculateMFI(data, length = 14) {
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
    }
    return moneyFlowIndex(data, length);
}
const MFI = createVolumeIndicator('MFI', 'Money Flow Index', calculateMFI, 14);
/**
 * Calculate Money Flow Index (MFI)
 *
 * MFI is a momentum oscillator that measures buying and selling pressure using price and volume.
 * Formula: MFI = 100 - (100 / (1 + Money Flow Ratio))
 * Money Flow Ratio = Positive Money Flow / Negative Money Flow
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of MFI values (0-100)
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const mfi = ta.mfi(marketData, 14)
 * // Returns: [50, 65, 35, 80, ...]
 * ```
 */
export function mfi(data, length, source) {
    return createIndicatorWrapper(MFI, data, length, source);
}
