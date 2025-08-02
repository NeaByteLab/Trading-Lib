import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Volume Adjusted Moving Average (VAMA)
 *
 * VAMA adjusts the moving average based on volume thresholds.
 * Formula: VAMA = Σ(Price × Volume) / Σ(Volume) where Volume > threshold
 * Filters out low-volume periods to focus on significant price movements.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @param volumeThreshold - Minimum volume threshold (default: 0)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of VAMA values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vama = ta.vama(marketData, 20, 1000)
 * // Returns: [100.5, 101.2, 102.1, 101.8, ...]
 * ```
 */
export declare function vama(data: MarketData | number[], length?: number, volumeThreshold?: number, source?: string): number[];
//# sourceMappingURL=vama.d.ts.map