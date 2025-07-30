import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { calculateMomentum } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
const Momentum = createOscillatorIndicator('Momentum', 'Momentum Indicator', calculateMomentum, 10);
/**
 * Calculate Momentum indicator
 *
 * @param data - Market data or price array
 * @param length - Lookback period (default: 10)
 * @returns Momentum values array
 */
export function momentum(data, length = 10) {
    return createIndicatorWrapper(Momentum, data, length);
}
