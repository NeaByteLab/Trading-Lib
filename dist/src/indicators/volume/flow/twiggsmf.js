import { createVolumeIndicator } from '@core/factories/indicator-factory';
import { ArrayUtils } from '@utils/array-utils';
import { calculateTwiggsMoneyFlow, calculateWindowAverage, transformToFinite } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Twiggs Money Flow using centralized utilities
 *
 * Twiggs Money Flow is a volume-weighted momentum indicator that measures buying and selling pressure.
 * Formula: TMF = (HLC3 - L) / (H - L) * V where HLC3 = (H + L + C) / 3
 * Uses exponential smoothing to reduce noise and identify trend changes.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 21)
 * @returns Twiggs Money Flow values array
 * @throws {Error} If market data is invalid or volume data is missing
 */
function calculateTwiggsMoneyFlowWrapper(data, length = 21) {
    if (Array.isArray(data)) {
        throw new Error('Market data required for Twiggs Money Flow calculation');
    }
    validateVolumeData(data);
    const moneyFlow = calculateTwiggsMoneyFlow(data.high, data.low, data.close, data.volume);
    const smoothed = ArrayUtils.processWindow(moneyFlow, length, (window) => {
        return calculateWindowAverage(window);
    });
    return transformToFinite(smoothed);
}
const TwiggsMoneyFlow = createVolumeIndicator('Twiggs Money Flow', 'Volume-weighted momentum indicator', calculateTwiggsMoneyFlowWrapper, 21);
/**
 * Calculate Twiggs Money Flow
 *
 * Twiggs Money Flow is a volume-weighted momentum indicator that measures buying and selling pressure.
 * Formula: TMF = (HLC3 - L) / (H - L) × V where HLC3 = (H + L + C) / 3
 * Uses exponential smoothing to reduce noise and identify trend changes.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 21)
 * @returns Array of Twiggs Money Flow values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const tmf = ta.twiggsMoneyFlow(marketData, 21)
 * // Returns: [0.5, 0.7, 0.3, 0.8, ...]
 * ```
 */
export function twiggsMoneyFlow(data, length) {
    return createIndicatorWrapper(TwiggsMoneyFlow, data, length);
}
