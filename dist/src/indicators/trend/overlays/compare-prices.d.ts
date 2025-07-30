import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Compare Prices Indicator
 *
 * Compares two price series to analyze their relative performance.
 * Provides ratio, performance percentage, and correlation coefficient.
 *
 * @example
 * ```typescript
 * const compare = new ComparePrices()
 * const result = compare.calculate([price1, price2], { basePrice: 100 })
 * console.log(result.values) // Ratio values
 * console.log(result.metadata.performance) // Performance values
 * console.log(result.metadata.correlation) // Correlation coefficient
 * ```
 */
export declare class ComparePrices extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Compare Prices using wrapper function
 *
 * @param price1 - First price array
 * @param price2 - Second price array
 * @param basePrice - Base price for comparison (default: 100)
 * @returns Comparison results
 */
export declare function comparePrices(price1: number[], price2: number[], basePrice?: number): {
    ratio: number[];
    performance: number[];
    correlation: number;
};
//# sourceMappingURL=compare-prices.d.ts.map