import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Volume Weighted Average Price (VWAP)
 *
 * Uses centralized calculation utilities to ensure consistency and eliminate duplication.
 * Pine Script equivalent: vwap(hlc3)
 *
 * @param data - Market data with OHLCV values
 * @returns Array of VWAP values
 * @throws {Error} If volume data is missing or invalid market data
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104],
 *   volume: [1000, 1200, 1100, 1300, 1400]
 * }
 * const vwap = volumeWeightedAveragePrice(marketData)
 * console.log(vwap) // VWAP values
 * ```
 */
export declare function volumeWeightedAveragePrice(data: MarketData): number[];
//# sourceMappingURL=volume-weighted.d.ts.map