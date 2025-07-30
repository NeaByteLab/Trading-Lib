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
 * Calculate MFI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns MFI values array
 */
export function mfi(data, length, source) {
    return createIndicatorWrapper(MFI, data, length, source);
}
