import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Wilder's Smoothing indicator
 *
 * Applies Wilder's smoothing algorithm to price data.
 * Formula: Smoothed = Previous + (Current - Previous) / Length
 *
 * @example
 * ```typescript
 * const wilders = new WildersSmoothing()
 * const result = wilders.calculate(marketData, { length: 14 })
 * console.log(result.values) // Smoothed values
 * ```
 */
export declare class WildersSmoothing extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Wilder's Smoothing using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Smoothing period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Smoothed values array
 */
export declare function wilders(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=wilders.d.ts.map