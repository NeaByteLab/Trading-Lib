import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Twiggs Money Flow
 *
 * Twiggs Money Flow is a volume-weighted momentum indicator that measures buying and selling pressure.
 * Formula: TMF = (HLC3 - L) / (H - L) × V where HLC3 = (H + L + C) / 3
 * Uses exponential smoothing to reduce noise and identify trend changes.
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 21)
 * @returns Array of Twiggs Money Flow values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const tmf = ta.twiggsMoneyFlow(marketData, 21)
 * // Returns: [0.5, 0.7, 0.3, 0.8, ...]
 * ```
 */
export declare function twiggsMoneyFlow(data: MarketData, length?: number): number[];
//# sourceMappingURL=twiggsmf.d.ts.map