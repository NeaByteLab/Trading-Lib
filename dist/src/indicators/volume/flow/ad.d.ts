import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Accumulation Distribution Line
 *
 * AD measures buying and selling pressure using volume-weighted price changes.
 * Formula: AD = Previous AD + Money Flow Multiplier × Volume
 * Money Flow Multiplier = ((Close - Low) - (High - Close)) / (High - Low)
 *
 * @param data - Market data with OHLCV values
 * @returns Array of Accumulation Distribution values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const ad = ta.accumulationDistribution(marketData)
 * // Returns: [1000000, 1050000, 1020000, 1080000, ...]
 * ```
 */
export declare function accumulationDistribution(data: MarketData): number[];
//# sourceMappingURL=ad.d.ts.map