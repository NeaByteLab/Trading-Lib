import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Money Flow Index (MFI)
 *
 * Uses centralized calculation utilities to ensure consistency and eliminate duplication.
 * Pine Script equivalent: mfi(length)
 *
 * @param data - Market data with OHLCV values
 * @param length - Period for calculation
 * @returns Array of MFI values (0-100)
 * @throws {Error} If volume data is missing or invalid parameters
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