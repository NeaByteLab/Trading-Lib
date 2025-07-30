import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Median Price Indicator
 *
 * Calculates the median of high and low prices.
 * Formula: Median Price = (High + Low) / 2
 *
 * @example
 * ```typescript
 * const medianPrice = new MedianPrice()
 * const result = medianPrice.calculate(marketData)
 * console.log(result.values) // Median price values
 * ```
 */
export declare class MedianPrice extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateMedianPrice;
}
/**
 * Calculate Median Price values using wrapper function
 *
 * @param data - Market data
 * @returns Median price values array
 */
export declare function medianPrice(data: MarketData): number[];
//# sourceMappingURL=median-price.d.ts.map