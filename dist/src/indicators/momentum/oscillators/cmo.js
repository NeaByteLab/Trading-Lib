import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { calculateCMO } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
const CMO = createOscillatorIndicator('CMO', 'Chande Momentum Oscillator', calculateCMO, 14);
/**
 * Calculate Chande Momentum Oscillator using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns CMO values array
 */
export function cmo(data, length, source) {
    return createIndicatorWrapper(CMO, data, length, source);
}
