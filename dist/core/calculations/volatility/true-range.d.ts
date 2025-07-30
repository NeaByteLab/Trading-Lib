import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate True Range (TR)
 *
 * Uses proper algorithm implementation with error handling.
 * Pine Script equivalent: tr(high, low, close)
 *
 * @param data - Market data with OHLC values
 * @returns Array of True Range values
 * @throws {Error} If market data is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104]
 * }
 * const tr = trueRange(marketData)
 * console.log(tr) // True Range values
 * ```
 */
export declare function trueRange(data: MarketData): number[];
//# sourceMappingURL=true-range.d.ts.map