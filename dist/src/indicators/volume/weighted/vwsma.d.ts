import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Volume Weighted Simple Moving Average (VWSMA)
 *
 * VWSMA is a simple moving average that weights prices by volume.
 * Formula: VWSMA = Σ(Price × Volume) / Σ(Volume) over period
 * Combines the simplicity of SMA with volume weighting.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of VWSMA values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const vwsma = ta.vwsma(marketData, 20)
 * // Returns: [100.5, 101.2, 102.1, 101.8, ...]
 * ```
 */
export declare function vwsma(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vwsma.d.ts.map