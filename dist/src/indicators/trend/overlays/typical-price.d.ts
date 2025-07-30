import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Typical Price Indicator
 *
 * Typical Price is a simple price calculation that represents the average of high, low, and close.
 * Formula: TP = (High + Low + Close) / 3
 * Used as a basis for many other technical indicators and analysis.
 *
 * @example
 * ```typescript
 * const typical = new TypicalPrice()
 * const result = typical.calculate(marketData)
 * console.log(result.values) // Typical Price values
 * ```
 */
export declare class TypicalPrice extends BaseIndicator {
    constructor();
    calculate(data: MarketData, config?: IndicatorConfig): IndicatorResult;
    private calculateTypicalPrice;
}
/**
 * Calculate Typical Price values using wrapper function
 *
 * @param data - Market data
 * @returns Typical Price values array
 */
export declare function typicalPrice(data: MarketData): number[];
//# sourceMappingURL=typical-price.d.ts.map