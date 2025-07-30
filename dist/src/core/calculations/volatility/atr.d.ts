import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Average True Range (ATR)
 *
 * Uses proper ATR calculation with configurable smoothing.
 * Formula: ATR = Smoothing(True Range) over period
 *
 * @param data - Market data with OHLC values
 * @param length - ATR calculation period
 * @param smoothing - Smoothing method ('wilders' or 'sma', default: 'wilders')
 * @returns Array of ATR values
 * @throws {Error} If market data is invalid or length is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104]
 * }
 * const atrValues = atr(marketData, 14)
 * console.log(atrValues) // ATR values
 * ```
 */
export declare function atr(data: MarketData, length: number, smoothing?: 'wilders' | 'rma' | 'sma'): number[];
//# sourceMappingURL=atr.d.ts.map