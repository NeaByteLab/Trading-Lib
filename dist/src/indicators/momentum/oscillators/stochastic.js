import { movingAverage } from '@calculations/moving-averages';
import { calculateStochastic } from '@utils/calculation-utils';
/**
 * Stochastic Oscillator - momentum indicator measuring price position within range
 * Formula: %K = ((Current Close - Lowest Low) / (Highest High - Lowest Low)) × 100
 * Formula: %D = SMA(%K, n periods)
 *
 * @param data - Market data with high, low, close arrays
 * @param kLength - K line period (default: 14)
 * @param dLength - D line period (default: 3)
 * @returns Stochastic K and D values
 *
 * @example
 * ```typescript
 * const stoch = ta.stochastic(data, 14, 3)
 * // Returns: { k: [...], d: [...] }
 * ```
 */
function calculateStochasticWrapper(data, kLength = 14, dLength = 3) {
    const k = calculateStochastic(data.close, data.high, data.low, kLength);
    const d = movingAverage(k, dLength, 'sma');
    return { k, d };
}
/**
 * Stochastic Oscillator - momentum indicator measuring price position within range
 * Formula: %K = ((Current Close - Lowest Low) / (Highest High - Lowest Low)) × 100
 * Formula: %D = SMA(%K, n periods)
 *
 * @param data - Market data
 * @param kLength - K line period (default: 14)
 * @param dLength - D line period (default: 3)
 * @returns Stochastic K and D values
 *
 * @example
 * ```typescript
 * const stoch = ta.stochastic(data, 14, 3)
 * // Returns: { k: [...], d: [...] }
 * ```
 */
export function stochastic(data, kLength, dLength) {
    return calculateStochasticWrapper(data, kLength || 14, dLength || 3);
}
