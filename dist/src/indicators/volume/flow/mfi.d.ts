import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Money Flow Index (MFI)
 *
 * MFI is a momentum oscillator that measures buying and selling pressure using price and volume.
 * Formula: MFI = 100 - (100 / (1 + Money Flow Ratio))
 * Money Flow Ratio = Positive Money Flow / Negative Money Flow
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns Array of MFI values (0-100)
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const mfi = ta.mfi(marketData, 14)
 * // Returns: [50, 65, 35, 80, ...]
 * ```
 */
export declare function mfi(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=mfi.d.ts.map