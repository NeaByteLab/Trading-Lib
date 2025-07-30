import type { MarketData } from '@core/types/indicator-types';
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
export declare function weightedClose(data: MarketData): number[];
//# sourceMappingURL=weighted-close.d.ts.map