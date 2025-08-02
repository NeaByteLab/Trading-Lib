import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate VWMA values using wrapper function
 *
 * @param data - Market data
 * @param length - Moving average period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns VWMA values array
 */
/**
 * Calculate Volume Weighted Moving Average (VWMA)
 *
 * VWMA is a moving average that weights prices by volume.
 * Formula: VWMA = Σ(Price × Volume) / Σ(Volume) over period
 * Provides more weight to periods with higher volume.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of VWMA values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vwma = ta.vwma(marketData, 20)
 * // Returns: [100.5, 101.2, 102.1, 101.8, ...]
 * ```
 */
export declare function vwma(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vwma.d.ts.map