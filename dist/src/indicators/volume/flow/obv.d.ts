import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate On Balance Volume (OBV)
 *
 * OBV measures buying and selling pressure by adding volume on up days and subtracting on down days.
 * Formula: OBV = Previous OBV + (Current Volume × Price Direction)
 * Price Direction = +1 if Close > Previous Close, -1 if Close < Previous Close, 0 if equal
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 1)
 * @param source - Price source (default: 'close')
 * @returns Array of OBV values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const obv = ta.obv(marketData)
 * // Returns: [1000000, 1050000, 1020000, 1080000, ...]
 * ```
 */
export declare function obv(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=obv.d.ts.map