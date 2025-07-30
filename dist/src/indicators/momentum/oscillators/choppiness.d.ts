import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Choppiness Index Indicator
 *
 * Measures the trendiness of a market by comparing the sum of true ranges
 * to the total range over a period. High values indicate choppy/sideways markets,
 * low values indicate trending markets.
 *
 * @example
 * ```typescript
 * const choppiness = new ChoppinessIndex()
 * const result = choppiness.calculate(marketData, { length: 14 })
 * console.log(result.values) // Choppiness Index values
 * ```
 */
export declare class ChoppinessIndex extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Choppiness Index using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Calculation period (default: 14)
 * @returns Choppiness Index values array
 */
export declare function choppiness(data: MarketData, length?: number): number[];
//# sourceMappingURL=choppiness.d.ts.map