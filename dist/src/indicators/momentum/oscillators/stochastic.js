import { movingAverage } from '@calculations/moving-averages';
import { calculateStochastic } from '@utils/calculation-utils';
/**
 * Calculate Stochastic using centralized utilities
 *
 * @param data - Market data with high, low, close arrays
 * @param kLength - K line period (default: 14)
 * @param dLength - D line period (default: 3)
 * @returns Stochastic K and D values
 */
function calculateStochasticWrapper(data, kLength = 14, dLength = 3) {
    const k = calculateStochastic(data.close, data.high, data.low, kLength);
    const d = movingAverage(k, dLength, 'sma');
    return { k, d };
}
/**
 * Calculate Stochastic Oscillator values using wrapper function
 *
 * @param data - Market data
 * @param kLength - K line period (default: 14)
 * @param dLength - D line period (default: 3)
 * @returns Stochastic K and D values
 */
export function stochastic(data, kLength, dLength) {
    return calculateStochasticWrapper(data, kLength || 14, dLength || 3);
}
