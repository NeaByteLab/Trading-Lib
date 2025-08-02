import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Positive Volume Index (PVI)
 *
 * PVI measures price changes only on days when volume increases.
 * Formula: PVI = Previous PVI × (1 + (Current Close - Previous Close) / Previous Close)
 * Only updates when current volume > previous volume.
 *
 * @param data - Market data with OHLCV values
 * @returns Array of PVI values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const pvi = ta.positiveVolumeIndex(marketData)
 * // Returns: [1000, 1050, 1100, 1150, ...]
 * ```
 */
export declare function positiveVolumeIndex(data: MarketData): number[];
//# sourceMappingURL=pvi.d.ts.map