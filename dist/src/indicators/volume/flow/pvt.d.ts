import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Price Volume Trend (PVT)
 *
 * PVT measures cumulative volume-weighted price change.
 * Formula: PVT = Previous PVT + ((Close - Previous Close) / Previous Close) × Volume
 * Helps identify buying and selling pressure over time.
 *
 * @param data - Market data with OHLCV values
 * @returns Array of PVT values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const pvt = ta.priceVolumeTrend(marketData)
 * // Returns: [0, 1500, -800, 2200, ...]
 * ```
 */
export declare function priceVolumeTrend(data: MarketData): number[];
//# sourceMappingURL=pvt.d.ts.map