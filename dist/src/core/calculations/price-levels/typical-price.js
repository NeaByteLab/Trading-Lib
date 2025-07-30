import { PinePrice } from '@utils/pine-core';
/**
 * Calculate typical price (HLC3)
 * Pine Script equivalent: hlc3
 *
 * @param data - Market data with OHLC values
 * @returns Array of typical prices
 * @throws {Error} If market data is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104]
 * }
 * const typical = typicalPrice(marketData)
 * console.log(typical) // Typical price values
 * ```
 */
export function typicalPrice(data) {
    return PinePrice.hlc3(data);
}
