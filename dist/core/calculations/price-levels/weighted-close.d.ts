import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate weighted close price
 * Pine Script equivalent: (high + low + close * 2) / 4
 *
 * @param data - Market data with OHLC values
 * @returns Array of weighted close prices
 */
export declare function weightedClose(data: MarketData): number[];
//# sourceMappingURL=weighted-close.d.ts.map