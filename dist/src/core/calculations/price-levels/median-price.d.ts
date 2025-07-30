import type { MarketData } from '@core/types/indicator-types';
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
export declare function medianPrice(data: MarketData): number[];
//# sourceMappingURL=median-price.d.ts.map