import { PinePrice } from '@utils/pine-core';
/**
 * Calculate median price (HL2)
 * Pine Script equivalent: hl2
 *
 * @param data - Market data with OHLC values
 * @returns Array of median prices
 * @throws {Error} If market data is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102]
 * }
 * const median = medianPrice(marketData)
 * console.log(median) // Median price values
 * ```
 */
export function medianPrice(data) {
    // Use PinePrice utilities instead of manual calculations
    return PinePrice.hl2(data);
}
