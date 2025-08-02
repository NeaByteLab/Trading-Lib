import type { MarketData } from '@core/types/indicator-types';
/**
 * Momentum Indicator - measures price momentum over specified period
 * Formula: Momentum = Current Price - Price n periods ago
 *
 * @param data - Market data or price array
 * @param length - Lookback period (default: 10)
 * @returns Momentum values array
 *
 * @example
 * ```typescript
 * const momentum = ta.momentum(data.close, 10)
 * // Returns: [NaN, NaN, ..., 2.5, 1.8, ...]
 * ```
 */
export declare function momentum(data: MarketData | number[], length?: number): number[];
//# sourceMappingURL=momentum.d.ts.map