import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createVolatilityIndicator } from '@core/factories/indicator-factory';
import { calculateCCIFromOHLC } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Calculate CCI using centralized utilities
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @returns CCI values array
 */
function calculateCCI(data, length = 20) {
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLC);
    }
    return calculateCCIFromOHLC(data, length);
}
const CCI = createVolatilityIndicator('CCI', 'Commodity Channel Index', calculateCCI, 20);
/**
 * Calculate CCI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CCI values array
 */
export function cci(data, length, source) {
    return createIndicatorWrapper(CCI, data, length, source);
}
