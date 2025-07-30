import { ArrayUtils } from '@utils/array-utils';
/**
 * Calculate weighted close price
 * Pine Script equivalent: (high + low + close * 2) / 4
 *
 * @param data - Market data with OHLC values
 * @returns Array of weighted close prices
 * @throws {Error} If market data is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104]
 * }
 * const weighted = weightedClose(marketData)
 * console.log(weighted) // Weighted close values
 * ```
 */
export function weightedClose(data) {
    return ArrayUtils.processArray(data.high, (high, i) => {
        const low = data.low[i];
        const close = data.close[i];
        return (high + low + close + close) / 4;
    });
}
