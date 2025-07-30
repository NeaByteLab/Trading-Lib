import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { ArrayUtils } from '@utils/array-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Calculate Rate of Change (ROC) indicator
 *
 * ROC = ((Current Price - Price n periods ago) / Price n periods ago) × 100
 *
 * @param data - Market data or price array
 * @param length - Lookback period (default: 10)
 * @returns ROC values array
 */
function calculateROC(data, length = 10) {
    return ArrayUtils.processArray(data, (current, i) => {
        if (i < length) {
            return NaN;
        }
        const previous = data[i - length];
        if (previous === 0) {
            return NaN;
        }
        return ((current - previous) / previous) * 100;
    });
}
const ROC = createOscillatorIndicator('ROC', 'Rate of Change', calculateROC, 10);
/**
 * Calculate Rate of Change (ROC) indicator
 *
 * @param data - Market data or price array
 * @param length - Lookback period (default: 10)
 * @returns ROC values array
 */
export function roc(data, length = 10) {
    return createIndicatorWrapper(ROC, data, length);
}
