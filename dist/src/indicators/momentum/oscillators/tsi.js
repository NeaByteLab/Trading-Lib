import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { calculateTSI } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
const TSI = createOscillatorIndicator('TSI', 'True Strength Index', calculateTSI, 25);
/**
 * Calculate TSI oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param firstLength - First smoothing period (default: 25)
 * @param secondLength - Second smoothing period (default: 13)
 * @param source - Price source (default: 'close')
 * @returns TSI values array
 */
export function tsi(data, firstLength, secondLength, source) {
    return createIndicatorWrapper(TSI, data, firstLength, source, { secondLength });
}
