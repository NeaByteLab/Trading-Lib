import { movingAverage } from '@calculations/moving-averages';
import { trueRange } from './true-range';
/**
 * Calculate Average True Range (ATR)
 *
 * Uses centralized moving average utilities for consistency.
 * Pine Script equivalent: atr(length)
 *
 * @param data - Market data with OHLC values
 * @param length - Period for smoothing
 * @returns Array of ATR values
 * @throws {Error} If market data is invalid or length is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104]
 * }
 * const atr = averageTrueRange(marketData, 14)
 * console.log(atr) // ATR values
 * ```
 */
export function averageTrueRange(data, length) {
    if (!Array.isArray(data.high) || !Array.isArray(data.low) || !Array.isArray(data.close)) {
        throw new Error('Invalid market data format');
    }
    if (length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    const tr = trueRange(data);
    return movingAverage(tr, length, 'sma');
}
//# sourceMappingURL=average-true-range.js.map