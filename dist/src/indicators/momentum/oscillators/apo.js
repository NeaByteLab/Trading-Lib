import { createOscillatorIndicator } from '@core/factories/indicator-factory';
import { calculateEMADifference } from '@utils/calculation-utils';
import { createIndicatorWrapper } from '@utils/indicator-utils';
/**
 * Calculate APO using centralized utilities
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @returns APO values array
 */
function calculateAPO(data, fastLength = 12, slowLength = 26) {
    return calculateEMADifference(data, fastLength, slowLength);
}
const APO = createOscillatorIndicator('APO', 'Absolute Price Oscillator', calculateAPO, 12);
/**
 * Calculate Absolute Price Oscillator values
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @returns APO values array
 */
export function apo(data, fastLength = 12, slowLength = 26) {
    return createIndicatorWrapper(APO, data, undefined, undefined, { fastLength, slowLength });
}
