import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Money Flow Index (MFI)
 *
 * Uses centralized calculation utilities to eliminate code duplication.
 * Pine Script equivalent: mfi(hlc3, volume, length)
 *
 * @param data - Market data with OHLCV values
 * @param length - MFI calculation period
 * @returns Array of MFI values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104],
 *   volume: [1000, 1200, 1100, 1300, 1400]
 * }
 * const mfi = moneyFlowIndex(marketData, 14)
 * console.log(mfi) // MFI values
 * ```
 */
export declare function moneyFlowIndex(data: MarketData, length: number): number[];
//# sourceMappingURL=money-flow.d.ts.map