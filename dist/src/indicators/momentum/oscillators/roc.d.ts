import type { MarketData } from '@core/types/indicator-types';
/**
 * Rate of Change (ROC) - measures the speed and magnitude of price changes
 * Formula: ROC = ((Current Price - Price n periods ago) / Price n periods ago) × 100
 *
 * @param data - Market data or price array
 * @param length - Lookback period (default: 10)
 * @returns ROC values array
 *
 * @example
 * ```typescript
 * const roc = ta.roc(data.close, 10)
 * // Returns: [NaN, NaN, ..., 5.2, -2.1, ...]
 * ```
 */
export declare function roc(data: MarketData | number[], length?: number): number[];
//# sourceMappingURL=roc.d.ts.map