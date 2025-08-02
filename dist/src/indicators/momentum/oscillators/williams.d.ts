import type { MarketData } from '@core/types/indicator-types';
/**
 * Williams %R - momentum oscillator measuring overbought/oversold levels
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Williams %R values
 *
 * @example
 * ```typescript
 * const williams = ta.williamsR(data, 14)
 * // Returns: [NaN, NaN, ..., -25.6, -18.9, ...]
 * ```
 */
export declare function williamsR(data: MarketData, length?: number, source?: string): number[];
//# sourceMappingURL=williams.d.ts.map