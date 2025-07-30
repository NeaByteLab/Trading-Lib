import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { calculateROC } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
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
