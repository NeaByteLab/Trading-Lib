import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate VWAP values using wrapper function
 *
 * VWAP is the average price weighted by volume over a specified period.
 * Formula: VWAP = Σ(Price × Volume) / Σ(Volume)
 * Uses typical price (HLC3) as the price component.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of VWAP values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vwap = ta.vwap(marketData, 20)
 * // Returns: [100.5, 101.2, 102.1, 101.8, ...]
 * ```
 */
export declare function vwap(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vwap.d.ts.map