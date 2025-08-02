import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Amihud Illiquidity Measure
 *
 * Amihud measures market liquidity using price impact per unit of volume.
 * Formula: Amihud = |Return| / Volume
 * Return = (Close - Previous Close) / Previous Close
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 20)
 * @returns Array of Amihud Illiquidity values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const amihud = ta.amihudIlliquidity(marketData, 20)
 * // Returns: [0.001, 0.002, 0.0015, 0.003, ...]
 * ```
 */
export declare function amihudIlliquidity(data: MarketData, length?: number): number[];
//# sourceMappingURL=amihud.d.ts.map